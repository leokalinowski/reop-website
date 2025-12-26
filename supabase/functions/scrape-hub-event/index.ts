const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ScrapedEventData {
  title: string;
  description: string | null;
  event_date: string | null;
  event_time: string | null;
  location: string | null;
  image_url: string | null;
  event_type: string | null;
  organizer: string | null;
}

function extractTextContent(html: string, pattern: RegExp): string | null {
  const match = html.match(pattern);
  if (match && match[1]) {
    // Remove HTML tags and decode entities
    return match[1]
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
  }
  return null;
}

function parseEventDate(dateStr: string | null): string | null {
  if (!dateStr) return null;
  
  try {
    // Try to parse various date formats
    // Example: "Tue, Jan 7, 2025" or "January 7, 2025"
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    }
  } catch (e) {
    console.log('Failed to parse date:', dateStr);
  }
  
  return null;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate URL format
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Validate it's a Hub URL
    if (!formattedUrl.includes('hub.realestateonpurpose.com')) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL must be from hub.realestateonpurpose.com' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scraping Hub event URL:', formattedUrl);

    // Fetch the page
    const response = await fetch(formattedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    if (!response.ok) {
      console.error('Failed to fetch page:', response.status, response.statusText);
      return new Response(
        JSON.stringify({ success: false, error: `Failed to fetch page: ${response.status}` }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const html = await response.text();
    console.log('Fetched HTML length:', html.length);

    // Extract event data from HTML
    const eventData: ScrapedEventData = {
      title: null,
      description: null,
      event_date: null,
      event_time: null,
      location: null,
      image_url: null,
      event_type: null,
      organizer: null,
    };

    // Extract title - look for h1 or main title
    eventData.title = extractTextContent(html, /<h1[^>]*>([^<]+)<\/h1>/i) ||
                      extractTextContent(html, /<title>([^<]+)<\/title>/i) ||
                      'Untitled Event';

    // Extract meta description
    const metaDescMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) ||
                          html.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
    if (metaDescMatch) {
      eventData.description = metaDescMatch[1].trim();
    }

    // Extract Open Graph image
    const ogImageMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                         html.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
    if (ogImageMatch) {
      eventData.image_url = ogImageMatch[1].trim();
    }

    // Look for date patterns in the page
    // Common patterns: "January 7, 2025", "Jan 7, 2025", "2025-01-07"
    const datePatterns = [
      /(?:Date|When|Date\s*&\s*Time)[:\s]*([A-Z][a-z]{2,8}\s+\d{1,2},?\s+\d{4})/i,
      /(\d{4}-\d{2}-\d{2})/,
      /([A-Z][a-z]{2},?\s+[A-Z][a-z]{2,8}\s+\d{1,2},?\s+\d{4})/i,
    ];

    for (const pattern of datePatterns) {
      const match = html.match(pattern);
      if (match) {
        eventData.event_date = parseEventDate(match[1]);
        if (eventData.event_date) break;
      }
    }

    // Look for time patterns
    const timeMatch = html.match(/(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?(?:\s*-\s*\d{1,2}:\d{2}\s*(?:AM|PM|am|pm)?)?)/i);
    if (timeMatch) {
      eventData.event_time = timeMatch[1].trim();
    }

    // Look for location
    const locationPatterns = [
      /(?:Location|Where|Venue)[:\s]*([^<\n]+)/i,
      /(?:Virtual|Online|Zoom|Google Meet)/i,
    ];
    
    for (const pattern of locationPatterns) {
      const match = html.match(pattern);
      if (match) {
        if (match[1]) {
          eventData.location = match[1].trim().substring(0, 200);
        } else if (match[0].toLowerCase().includes('virtual') || 
                   match[0].toLowerCase().includes('online') ||
                   match[0].toLowerCase().includes('zoom')) {
          eventData.location = 'Virtual Event';
        }
        break;
      }
    }

    // Look for event type
    const eventTypeMatch = html.match(/(?:Event\s*Type|Type)[:\s]*([^<\n]+)/i);
    if (eventTypeMatch) {
      eventData.event_type = eventTypeMatch[1].trim().substring(0, 50);
    }

    // Default organizer
    eventData.organizer = "Pam O'Bryant";

    console.log('Extracted event data:', eventData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: eventData 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error scraping event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to scrape event';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
