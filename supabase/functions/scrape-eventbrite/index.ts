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
  rsvp_link: string | null;
}

function parseEventbriteDate(dateStr: string): { date: string | null; time: string | null } {
  // Parse formats like "Tuesday, February 4 · 10am - 12pm EST"
  // or "Feb 4 · 10:00 AM EST"
  const result = { date: null as string | null, time: null as string | null };
  
  if (!dateStr) return result;
  
  try {
    // Extract time portion (after the dot)
    const timeMatch = dateStr.match(/·\s*(.+)/);
    if (timeMatch) {
      result.time = timeMatch[1].trim();
    }
    
    // Extract date portion (before the dot)
    const datePart = dateStr.split('·')[0].trim();
    
    // Try to parse the date
    // Handle formats like "Tuesday, February 4" or "Feb 4, 2025"
    const currentYear = new Date().getFullYear();
    
    // Remove day of week if present
    const cleanDate = datePart.replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s*/i, '');
    
    // Try parsing with current year
    let parsedDate = new Date(`${cleanDate}, ${currentYear}`);
    
    // If date is in the past, try next year
    if (parsedDate < new Date()) {
      parsedDate = new Date(`${cleanDate}, ${currentYear + 1}`);
    }
    
    if (!isNaN(parsedDate.getTime())) {
      result.date = parsedDate.toISOString();
    }
  } catch (e) {
    console.log('Failed to parse Eventbrite date:', dateStr, e);
  }
  
  return result;
}

function extractFromMarkdown(markdown: string, eventUrl: string): ScrapedEventData {
  const eventData: ScrapedEventData = {
    title: null,
    description: null,
    event_date: null,
    event_time: null,
    location: null,
    image_url: null,
    event_type: null,
    organizer: null,
    rsvp_link: eventUrl,
  };

  const lines = markdown.split('\n').map(line => line.trim());
  
  // Extract title - first H1 heading
  for (const line of lines) {
    if (line.startsWith('# ')) {
      eventData.title = line.replace(/^#\s+/, '').trim();
      break;
    }
  }

  // Extract organizer - "By **Name**" pattern
  const organizerMatch = markdown.match(/By\s+\*\*(.+?)\*\*/);
  if (organizerMatch) {
    eventData.organizer = organizerMatch[1].trim();
  }

  // Find sections
  let currentSection = '';
  let descriptionLines: string[] = [];
  let locationLines: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect section headers
    if (line === '## Overview' || line === '## About this event') {
      currentSection = 'description';
      continue;
    }
    if (line === '## Location') {
      currentSection = 'location';
      continue;
    }
    if (line === '## Highlights' || line === '## Tags') {
      currentSection = 'highlights';
      continue;
    }
    if (line.startsWith('## ') && currentSection) {
      // New section, stop collecting previous
      currentSection = '';
      continue;
    }
    
    // Collect content based on section
    if (currentSection === 'description' && line && !line.startsWith('#')) {
      descriptionLines.push(line);
    }
    
    if (currentSection === 'location' && line && !line.startsWith('#')) {
      locationLines.push(line);
    }
    
    if (currentSection === 'highlights') {
      // Look for event type indicators
      if (line.toLowerCase().includes('in person') || line.toLowerCase().includes('in-person')) {
        eventData.event_type = 'In Person';
      } else if (line.toLowerCase().includes('online') || line.toLowerCase().includes('virtual')) {
        eventData.event_type = 'Online';
      } else if (line.toLowerCase().includes('hybrid')) {
        eventData.event_type = 'Hybrid';
      }
    }
  }

  // Build description
  if (descriptionLines.length > 0) {
    eventData.description = descriptionLines.join('\n\n');
  }

  // Build location (first few lines, typically venue + address)
  if (locationLines.length > 0) {
    eventData.location = locationLines.slice(0, 3).join(', ').replace(/,\s*,/g, ',');
  }

  // Extract date/time - look for patterns like "Tuesday, February 4 · 10am"
  // Usually appears near price or in a specific format
  const dateTimePattern = /(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+\w+\s+\d{1,2}(?:,?\s+\d{4})?\s*·\s*[\d:]+\s*(?:am|pm|AM|PM)/i;
  const dateTimeMatch = markdown.match(dateTimePattern);
  if (dateTimeMatch) {
    const parsed = parseEventbriteDate(dateTimeMatch[0]);
    eventData.event_date = parsed.date;
    eventData.event_time = parsed.time;
  } else {
    // Try alternative pattern: "Feb 4 · 10:00 AM"
    const altPattern = /\b(\w{3,9}\s+\d{1,2}(?:,?\s+\d{4})?)\s*·\s*([\d:]+\s*(?:am|pm|AM|PM)[^·\n]*)/i;
    const altMatch = markdown.match(altPattern);
    if (altMatch) {
      const parsed = parseEventbriteDate(`${altMatch[1]} · ${altMatch[2]}`);
      eventData.event_date = parsed.date;
      eventData.event_time = parsed.time;
    }
  }

  // Fallback title
  if (!eventData.title) {
    eventData.title = 'Untitled Event';
  }

  return eventData;
}

Deno.serve(async (req) => {
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

    // Format URL
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = `https://${formattedUrl}`;
    }

    // Validate it's an Eventbrite URL
    if (!formattedUrl.includes('eventbrite.com')) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL must be from eventbrite.com' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scraping Eventbrite URL with Firecrawl:', formattedUrl);

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl API key not configured. Please connect Firecrawl in Settings.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Firecrawl to scrape the page
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v1/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: formattedUrl,
        formats: ['markdown'],
        onlyMainContent: true,
        waitFor: 3000,
      }),
    });

    const firecrawlData = await firecrawlResponse.json();

    if (!firecrawlResponse.ok) {
      console.error('Firecrawl API error:', firecrawlData);
      return new Response(
        JSON.stringify({ success: false, error: firecrawlData.error || 'Failed to scrape page' }),
        { status: firecrawlResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const markdown = firecrawlData.data?.markdown || firecrawlData.markdown;
    
    if (!markdown) {
      console.error('No markdown content returned from Firecrawl');
      return new Response(
        JSON.stringify({ success: false, error: 'No content found on page' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Firecrawl markdown length:', markdown.length);
    console.log('Markdown preview:', markdown.substring(0, 800));

    // Extract event data from markdown
    const eventData = extractFromMarkdown(markdown, formattedUrl);

    // Try to get image from metadata
    const metadata = firecrawlData.data?.metadata || firecrawlData.metadata;
    if (metadata?.ogImage) {
      eventData.image_url = metadata.ogImage;
    }

    console.log('Extracted Eventbrite event data:', eventData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data: eventData 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error scraping Eventbrite event:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to scrape event';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
