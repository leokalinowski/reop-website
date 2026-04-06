import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Simple rate limiting
const ipRequests = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now > entry.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + 3600000 });
    return true;
  }
  if (entry.count >= 3) return false;
  entry.count++;
  return true;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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

    // Validate required fields
    const { first_name, last_name, email, phone, instagram, youtube, tiktok, audience_size, real_estate_experience, promotion_plan } = body;

    if (!first_name || typeof first_name !== "string" || first_name.trim().length === 0) {
      return new Response(JSON.stringify({ error: "First name is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!last_name || typeof last_name !== "string" || last_name.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Last name is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Valid email is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const allowedAudienceSizes = ["<1K", "1-5K", "5-25K", "25K+"];
    if (!audience_size || !allowedAudienceSizes.includes(audience_size)) {
      return new Response(JSON.stringify({ error: "Valid audience size is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const allowedExperience = ["none", "1-3years", "3-5years", "5+years", "coach-trainer"];
    if (!real_estate_experience || !allowedExperience.includes(real_estate_experience)) {
      return new Response(JSON.stringify({ error: "Valid experience level is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Sanitize
    const sanitize = (s: string | null, maxLen = 255): string | null =>
      s ? s.trim().slice(0, maxLen) : null;

    const record = {
      first_name: sanitize(first_name, 100)!,
      last_name: sanitize(last_name, 100)!,
      email: email.trim().toLowerCase().slice(0, 255),
      phone: sanitize(phone, 20),
      instagram: sanitize(instagram, 100),
      youtube: sanitize(youtube, 200),
      tiktok: sanitize(tiktok, 100),
      audience_size,
      real_estate_experience,
      promotion_plan: sanitize(promotion_plan, 2000),
    };

    // Insert into Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error: dbError } = await supabase
      .from("affiliate_leads")
      .insert(record)
      .select("id")
      .single();

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save application" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send to LeadConnector webhook (fire-and-forget)
    fetch("https://services.leadconnectorhq.com/hooks/EvF7HNDSZUqlgzPqnfwz/webhook-trigger/pLQyKHlOX1SrqDitnz2n", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: record.first_name,
        lastName: record.last_name,
        email: record.email,
        phone: record.phone || "",
        tags: ["Affiliate Applicant", `Audience: ${audience_size}`, `Experience: ${real_estate_experience}`],
        source: "REOP Affiliate Application",
        customField: {
          instagram: record.instagram || "",
          youtube: record.youtube || "",
          tiktok: record.tiktok || "",
          audience_size: record.audience_size,
          real_estate_experience: record.real_estate_experience,
          promotion_plan: record.promotion_plan || "",
        },
      }),
    }).catch((e) => console.error("LeadConnector webhook error:", e));

    return new Response(
      JSON.stringify({ success: true, id: data.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
