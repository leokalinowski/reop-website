import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Upload, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ResourcesManager = () => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingResource, setEditingResource] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [resourceFile, setResourceFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const queryClient = useQueryClient();

  const { data: resources, isLoading } = useQuery({
    queryKey: ["admin-resources"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("free_resources")
        .select("*")
        .order("display_order");
      if (error) throw error;
      return data;
    },
  });

  const handleFileUpload = async (file: File, bucket: string) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    return filePath;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      setUploading(true);
      try {
        let fileUrl = editingResource.file_url;
        let thumbnailUrl = editingResource.thumbnail_url;

        if (resourceFile) {
          fileUrl = await handleFileUpload(resourceFile, "free-resources");
        }

        if (thumbnailFile) {
          const uploadedPath = await handleFileUpload(thumbnailFile, "blog-images");
          const { data: { publicUrl } } = supabase.storage
            .from("blog-images")
            .getPublicUrl(uploadedPath);
          thumbnailUrl = publicUrl;
        }

        const dataToSave = {
          ...editingResource,
          file_url: fileUrl,
          thumbnail_url: thumbnailUrl,
        };

        if (editingResource.id) {
          const { error } = await supabase
            .from("free_resources")
            .update(dataToSave)
            .eq("id", editingResource.id);
          if (error) throw error;
        } else {
          const { error } = await supabase.from("free_resources").insert(dataToSave);
          if (error) throw error;
        }
      } finally {
        setUploading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] });
      toast.success("Resource saved");
      setIsDialogOpen(false);
      setEditingResource(null);
      setResourceFile(null);
      setThumbnailFile(null);
    },
    onError: (error: any) => {
      toast.error("Failed to save: " + error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("free_resources").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] });
      toast.success("Resource deleted");
      setDeleteId(null);
    },
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const openCreateDialog = () => {
    setEditingResource({
      title: "",
      slug: "",
      description: "",
      resource_type: "pdf",
      file_url: "",
      thumbnail_url: "",
      is_active: true,
      display_order: 0,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (resource: any) => {
    setEditingResource(resource);
    setIsDialogOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Resources</h1>
              <p className="text-muted-foreground">Manage free resources</p>
            </div>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Resources</CardTitle>
              <CardDescription>View and manage downloadable resources</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Downloads</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {resources?.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {resource.resource_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={resource.is_active ? "default" : "secondary"}>
                            {resource.is_active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{resource.download_count || 0}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(resource)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(resource.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Edit/Create Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingResource?.id ? "Edit Resource" : "Create Resource"}
              </DialogTitle>
              <DialogDescription>
                Fill in the details for the resource
              </DialogDescription>
            </DialogHeader>

            {editingResource && (
              <div className="space-y-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={editingResource.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setEditingResource((prev: any) => ({
                        ...prev,
                        title,
                        slug: prev.slug || generateSlug(title),
                      }));
                    }}
                  />
                </div>

                <div>
                  <Label>Slug</Label>
                  <Input
                    value={editingResource.slug}
                    onChange={(e) => setEditingResource((prev: any) => ({ ...prev, slug: e.target.value }))}
                  />
                </div>

                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={editingResource.description}
                    onChange={(e) => setEditingResource((prev: any) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div>
                  <Label>Resource Type</Label>
                  <Select
                    value={editingResource.resource_type}
                    onValueChange={(value) => setEditingResource((prev: any) => ({ ...prev, resource_type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="webinar">Webinar</SelectItem>
                      <SelectItem value="toolkit">Toolkit</SelectItem>
                      <SelectItem value="scorecard">Scorecard</SelectItem>
                      <SelectItem value="plan">Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Resource File</Label>
                  <Input
                    type="file"
                    onChange={(e) => setResourceFile(e.target.files?.[0] || null)}
                  />
                  {editingResource.file_url && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Current: {editingResource.file_url}
                    </p>
                  )}
                </div>

                <div>
                  <Label>Thumbnail Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                  />
                  {editingResource.thumbnail_url && (
                    <img
                      src={editingResource.thumbnail_url}
                      alt="Thumbnail"
                      className="mt-2 h-32 rounded"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Label>Active</Label>
                  <Switch
                    checked={editingResource.is_active}
                    onCheckedChange={(checked) => setEditingResource((prev: any) => ({ ...prev, is_active: checked }))}
                  />
                </div>

                <Button
                  onClick={() => saveMutation.mutate()}
                  disabled={uploading}
                  className="w-full"
                >
                  {uploading ? "Saving..." : "Save Resource"}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Resource</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this resource? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteId && deleteMutation.mutate(deleteId)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default ResourcesManager;