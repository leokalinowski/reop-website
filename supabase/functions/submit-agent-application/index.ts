import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

function sanitize(val: string | undefined | null): string {
  if (!val) return "";
  return val.trim().slice(0, 1000);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (!checkRateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();

    // Honeypot
    if (body.website) {
      return new Response(JSON.stringify({ success: true, applicationId: "ok" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate required fields
    const firstName = sanitize(body.first_name);
    const lastName = sanitize(body.last_name);
    const email = sanitize(body.email).toLowerCase();
    const phone = sanitize(body.phone);

    // Normalize US phone numbers to include +1
    let normalizedPhone = phone.replace(/\D/g, '');
    if (normalizedPhone.length === 10) {
      normalizedPhone = '+1' + normalizedPhone;
    } else if (normalizedPhone.length === 11 && normalizedPhone.startsWith('1')) {
      normalizedPhone = '+' + normalizedPhone;
    } else {
      normalizedPhone = phone;
    }

    if (!firstName || !lastName || !email || !phone) {
      return new Response(
        JSON.stringify({ error: "First name, last name, email, and phone are required." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Please provide a valid email address." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const licenseStates = Array.isArray(body.license_states)
      ? body.license_states.filter((s: string) => typeof s === "string").map((s: string) => s.slice(0, 20))
      : [];

    const record = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      license_states: licenseStates,
      annual_transactions: sanitize(body.annual_transactions).slice(0, 20),
      years_experience: sanitize(body.years_experience).slice(0, 20),
      note: sanitize(body.note),
      team_slug: sanitize(body.team_slug) || "blue-jay-properties",
    };

    const { data, error } = await supabase
      .from("agent_applications")
      .insert(record)
      .select("id")
      .single();

    if (error) {
      console.error("DB insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to save application. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Webhook — placeholder URL; replace once webhook is created
    const WEBHOOK_URL = "https://services.leadconnectorhq.com/hooks/EvF7HNDSZUqlgzPqnfwz/webhook-trigger/53e09e42-528f-4e7d-b617-3b9237896bf6";

    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          licenseStates,
          annualTransactions: record.annual_transactions,
          yearsExperience: record.years_experience,
          note: record.note,
          teamSlug: record.team_slug,
          source: "reop-website-agent-application",
          tags: ["agent-application", `team:${record.team_slug}`],
        }),
      }).catch((err) => console.error("Webhook error:", err));
    }

    return new Response(
      JSON.stringify({ success: true, applicationId: data.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
