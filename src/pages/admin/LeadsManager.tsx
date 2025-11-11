import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import AdminNavigation from "@/components/AdminNavigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import {
  Users,
  Download,
  Search,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { format } from "date-fns";

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  status: string;
  location: string | null;
  sphere_size: number | null;
  weekly_hours: number | null;
  annual_transactions: number | null;
  target_income: number | null;
  experience_level: string | null;
  current_brokerage: string | null;
  preferred_markets: string[] | null;
  business_objectives: string | null;
  start_timeline: string | null;
  communication_preferences: string[] | null;
  sphere_contact_frequency: string | null;
  budget_management_style: string | null;
  business_stress_level: string | null;
  biggest_challenge: string | null;
  pdf_generated: boolean;
  pdf_sent: boolean;
  created_at: string;
  updated_at: string;
}

interface ResourceDownload {
  id: string;
  downloaded_at: string;
  resource: {
    title: string;
    resource_type: string;
  };
}

const statusColors: Record<string, string> = {
  new: "bg-slate-500",
  contacted: "bg-blue-500",
  qualified: "bg-green-500",
  closed: "bg-purple-500",
  lost: "bg-red-500",
};

const LeadsManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const queryClient = useQueryClient();

  // Fetch all leads
  const { data: leads, isLoading } = useQuery({
    queryKey: ["admin-leads", statusFilter, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      if (searchTerm) {
        query = query.or(
          `first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Lead[];
    },
  });

  // Fetch resource downloads for selected lead
  const { data: downloads } = useQuery({
    queryKey: ["lead-downloads", selectedLead?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("resource_downloads")
        .select(
          `
          id,
          downloaded_at,
          resource:free_resources(title, resource_type)
        `
        )
        .eq("lead_id", selectedLead?.id)
        .order("downloaded_at", { ascending: false });

      if (error) throw error;
      return data as ResourceDownload[];
    },
    enabled: !!selectedLead?.id,
  });

  // Update lead status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({
      leadId,
      newStatus,
    }: {
      leadId: string;
      newStatus: string;
    }) => {
      const { error } = await supabase
        .from("leads")
        .update({ status: newStatus })
        .eq("id", leadId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-leads"] });
      toast({
        title: "Success",
        description: "Lead status updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update lead status",
        variant: "destructive",
      });
    },
  });

  // Export to CSV
  const exportToCSV = () => {
    if (!leads || leads.length === 0) {
      toast({
        title: "No leads to export",
        description: "There are no leads matching your current filters",
        variant: "destructive",
      });
      return;
    }

    const headers = [
      "First Name",
      "Last Name",
      "Email",
      "Phone",
      "Status",
      "Location",
      "Sphere Size",
      "Weekly Hours",
      "Annual Transactions",
      "Target Income",
      "Experience Level",
      "Current Brokerage",
      "Biggest Challenge",
      "Business Stress Level",
      "Created Date",
    ];

    const rows = leads.map((lead) => [
      lead.first_name,
      lead.last_name,
      lead.email,
      lead.phone || "",
      lead.status,
      lead.location || "",
      lead.sphere_size || 0,
      lead.weekly_hours || 0,
      lead.annual_transactions || 0,
      lead.target_income || 0,
      lead.experience_level || "",
      lead.current_brokerage || "",
      lead.biggest_challenge || "",
      lead.business_stress_level || "",
      format(new Date(lead.created_at), "MM/dd/yyyy"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `leads-export-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    toast({
      title: "Export successful",
      description: `Exported ${leads.length} leads to CSV`,
    });
  };

  // Calculate stats
  const totalLeads = leads?.length || 0;
  const newLeads = leads?.filter((l) => l.status === "new").length || 0;
  const qualifiedLeads = leads?.filter((l) => l.status === "qualified").length || 0;
  const closedLeads = leads?.filter((l) => l.status === "closed").length || 0;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminNavigation />

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Leads Management
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage all captured leads
            </p>
          </div>
          <Button onClick={exportToCSV} className="gap-2">
            <Download className="h-4 w-4" />
            Export to CSV
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLeads}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Leads</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newLeads}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Qualified Leads
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{qualifiedLeads}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Closed Leads
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{closedLeads}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
              {(searchTerm || statusFilter !== "all") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Leads Table */}
        <Card>
          <CardContent className="pt-6">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : !leads || leads.length === 0 ? (
              <div className="text-center py-12">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  No leads found matching your filters
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="hidden md:table-cell">Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Sphere Size
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Target Income
                      </TableHead>
                      <TableHead className="hidden xl:table-cell">
                        Created
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="font-medium">
                          {lead.first_name} {lead.last_name}
                        </TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {lead.phone || "—"}
                        </TableCell>
                        <TableCell>
                          <Select
                            value={lead.status}
                            onValueChange={(value) =>
                              updateStatusMutation.mutate({
                                leadId: lead.id,
                                newStatus: value,
                              })
                            }
                          >
                            <SelectTrigger className="w-[130px]">
                              <Badge
                                className={`${
                                  statusColors[lead.status]
                                } text-white`}
                              >
                                {lead.status}
                              </Badge>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">
                                Contacted
                              </SelectItem>
                              <SelectItem value="qualified">
                                Qualified
                              </SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                              <SelectItem value="lost">Lost</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {lead.sphere_size || "—"}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {lead.target_income
                            ? `$${lead.target_income.toLocaleString()}`
                            : "—"}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          {format(new Date(lead.created_at), "MM/dd/yyyy")}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedLead(lead)}
                            className="gap-2"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedLead?.first_name} {selectedLead?.last_name}
            </DialogTitle>
            <DialogDescription>Complete lead information</DialogDescription>
          </DialogHeader>

          {selectedLead && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedLead.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedLead.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">
                      {selectedLead.location || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Communication Preferences
                    </p>
                    <p className="font-medium">
                      {selectedLead.communication_preferences?.join(", ") ||
                        "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Profile */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Business Profile
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Experience Level
                    </p>
                    <p className="font-medium">
                      {selectedLead.experience_level || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Current Brokerage
                    </p>
                    <p className="font-medium">
                      {selectedLead.current_brokerage || "—"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">
                      Preferred Markets
                    </p>
                    <p className="font-medium">
                      {selectedLead.preferred_markets?.join(", ") || "—"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">
                      Business Objectives
                    </p>
                    <p className="font-medium">
                      {selectedLead.business_objectives || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Start Timeline
                    </p>
                    <p className="font-medium">
                      {selectedLead.start_timeline || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Sphere Size</p>
                    <p className="font-medium text-lg">
                      {selectedLead.sphere_size || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Weekly Hours
                    </p>
                    <p className="font-medium text-lg">
                      {selectedLead.weekly_hours || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Annual Transactions
                    </p>
                    <p className="font-medium text-lg">
                      {selectedLead.annual_transactions || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Target Income
                    </p>
                    <p className="font-medium text-lg">
                      {selectedLead.target_income
                        ? `$${selectedLead.target_income.toLocaleString()}`
                        : "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Insights */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Business Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Sphere Contact Frequency
                    </p>
                    <p className="font-medium">
                      {selectedLead.sphere_contact_frequency || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Budget Management Style
                    </p>
                    <p className="font-medium">
                      {selectedLead.budget_management_style || "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Business Stress Level
                    </p>
                    <p className="font-medium">
                      {selectedLead.business_stress_level || "—"}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">
                      Biggest Challenge
                    </p>
                    <p className="font-medium">
                      {selectedLead.biggest_challenge || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Downloaded Resources */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Downloaded Resources
                </h3>
                {downloads && downloads.length > 0 ? (
                  <div className="space-y-2">
                    {downloads.map((download) => (
                      <div
                        key={download.id}
                        className="flex items-center justify-between bg-muted/50 p-3 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">
                            {download.resource.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {download.resource.resource_type}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(
                            new Date(download.downloaded_at),
                            "MM/dd/yyyy"
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg text-center">
                    No resources downloaded yet
                  </p>
                )}
              </div>

              {/* Activity Timeline */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Activity Timeline
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">
                      {format(
                        new Date(selectedLead.created_at),
                        "MMM dd, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Last Updated
                    </p>
                    <p className="font-medium">
                      {format(
                        new Date(selectedLead.updated_at),
                        "MMM dd, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div>
                <h3 className="text-lg font-semibold mb-3">
                  Update Lead Status
                </h3>
                <Select
                  value={selectedLead.status}
                  onValueChange={(value) => {
                    updateStatusMutation.mutate({
                      leadId: selectedLead.id,
                      newStatus: value,
                    });
                    setSelectedLead({ ...selectedLead, status: value });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </ProtectedRoute>
  );
};

export default LeadsManager;
