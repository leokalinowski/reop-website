import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Upload } from "lucide-react";

const BlogPostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image_url: "",
    seo_title: "",
    seo_description: "",
    is_published: false,
    is_featured: false,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", id],
    queryFn: async () => {
      if (isNew) return null;
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !isNew,
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || "",
        slug: post.slug || "",
        excerpt: post.excerpt || "",
        content: post.content || "",
        featured_image_url: post.featured_image_url || "",
        seo_title: post.seo_title || "",
        seo_description: post.seo_description || "",
        is_published: post.is_published || false,
        is_featured: post.is_featured || false,
      });
    }
  }, [post]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      seo_title: prev.seo_title || title,
    }));
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    setUploading(true);
    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(filePath, imageFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      setFormData((prev) => ({ ...prev, featured_image_url: publicUrl }));
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const dataToSave = {
        ...formData,
        published_at: formData.is_published ? new Date().toISOString() : null,
      };

      if (isNew) {
        const { error } = await supabase.from("blog_posts").insert(dataToSave);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .update(dataToSave)
          .eq("id", id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(isNew ? "Post created" : "Post updated");
      navigate("/admin/blog-posts");
    },
    onError: (error: any) => {
      toast.error("Failed to save: " + error.message);
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/blog-posts")}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>

          <h1 className="text-4xl font-bold mb-8">
            {isNew ? "Create New Post" : "Edit Post"}
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Post Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Title</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Post title"
                    />
                  </div>

                  <div>
                    <Label>Slug</Label>
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                      placeholder="post-slug"
                    />
                  </div>

                  <div>
                    <Label>Excerpt</Label>
                    <Textarea
                      value={formData.excerpt}
                      onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                      placeholder="Brief description"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                      placeholder="Post content (HTML supported)"
                      rows={15}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>SEO Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>SEO Title</Label>
                    <Input
                      value={formData.seo_title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, seo_title: e.target.value }))}
                      placeholder="SEO optimized title"
                      maxLength={60}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.seo_title.length}/60 characters
                    </p>
                  </div>

                  <div>
                    <Label>SEO Description</Label>
                    <Textarea
                      value={formData.seo_description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, seo_description: e.target.value }))}
                      placeholder="SEO meta description"
                      rows={3}
                      maxLength={160}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {formData.seo_description.length}/160 characters
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Featured Image</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {formData.featured_image_url && (
                    <img
                      src={formData.featured_image_url}
                      alt="Featured"
                      className="w-full rounded-lg"
                    />
                  )}
                  
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  {imageFile && (
                    <Button onClick={handleImageUpload} disabled={uploading} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? "Uploading..." : "Upload Image"}
                    </Button>
                  )}

                  <div>
                    <Label>Image URL</Label>
                    <Input
                      value={formData.featured_image_url}
                      onChange={(e) => setFormData((prev) => ({ ...prev, featured_image_url: e.target.value }))}
                      placeholder="Or paste image URL"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Publishing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Published</Label>
                    <Switch
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_published: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label>Featured</Label>
                    <Switch
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, is_featured: checked }))}
                    />
                  </div>

                  <Button
                    onClick={() => saveMutation.mutate()}
                    disabled={saveMutation.isPending}
                    className="w-full"
                  >
                    {saveMutation.isPending ? "Saving..." : "Save Post"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default BlogPostEditor;