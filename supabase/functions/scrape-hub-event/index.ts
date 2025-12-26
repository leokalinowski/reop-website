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

function parseEventDate(dateStr: string): string | null {
  if (!dateStr) return null;
  
  try {
    // Parse formats like "Wednesday, January 14, 2026"
    const date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
      return date.toISOString();
    }
  } catch (e) {
    console.log('Failed to parse date:', dateStr);
  }
  
  return null;
}

function extractFromMarkdown(markdown: string): ScrapedEventData {
  const eventData: ScrapedEventData = {
    title: null,
    description: null,
    event_date: null,
    event_time: null,
    location: null,
    image_url: null,
    event_type: null,
    organizer: "Pam O'Bryant",
  };

  const lines = markdown.split('\n').map(line => line.trim()).filter(Boolean);
  
  // Extract title - first H1 heading
  for (const line of lines) {
    if (line.startsWith('# ') && !line.includes('About')) {
      eventData.title = line.replace(/^#\s+/, '').trim();
      break;
    }
  }

  // Find sections by looking for specific patterns
  let currentSection = '';
  let descriptionLines: string[] = [];
  let inAboutSection = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect section headers
    if (line === 'Date & Time' || line === 'Date and Time') {
      currentSection = 'datetime';
      continue;
    }
    if (line === 'Location') {
      currentSection = 'location';
      continue;
    }
    if (line === 'Event Type') {
      currentSection = 'eventtype';
      continue;
    }
    if (line.includes('About This Event') || line.startsWith('## About')) {
      currentSection = 'description';
      inAboutSection = true;
      continue;
    }
    
    // Extract values based on current section
    if (currentSection === 'datetime') {
      // Look for date pattern (day name, month day, year)
      const dateMatch = line.match(/(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),?\s+(\w+\s+\d{1,2},?\s+\d{4})/i);
      if (dateMatch) {
        eventData.event_date = parseEventDate(line);
      }
      // Look for time pattern
      const timeMatch = line.match(/(\d{1,2}:\d{2}\s*(?:AM|PM)?)/i);
      if (timeMatch && !dateMatch) {
        eventData.event_time = timeMatch[1].trim();
      }
      // Move to next section after getting both
      if (eventData.event_date && eventData.event_time) {
        currentSection = '';
      }
    }
    
    if (currentSection === 'location' && !line.startsWith('#')) {
      if (!eventData.location && line.length > 0) {
        eventData.location = line;
        currentSection = '';
      }
    }
    
    if (currentSection === 'eventtype' && !line.startsWith('#')) {
      if (!eventData.event_type && line.length > 0) {
        eventData.event_type = line;
        currentSection = '';
      }
    }
    
    if (inAboutSection && currentSection === 'description') {
      // Stop at next major section or end markers
      if (line.startsWith('##') || line.includes('RSVP') || line.includes('Register')) {
        inAboutSection = false;
        currentSection = '';
        continue;
      }
      if (!line.startsWith('#') && line.length > 0) {
        descriptionLines.push(line);
      }
    }
  }

  // Build description from collected lines
  if (descriptionLines.length > 0) {
    eventData.description = descriptionLines.join('\n\n');
  }

  // Fallback title extraction
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

    // Validate it's a Hub URL
    if (!formattedUrl.includes('hub.realestateonpurpose.com')) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL must be from hub.realestateonpurpose.com' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Scraping Hub event URL with Firecrawl:', formattedUrl);

    const apiKey = Deno.env.get('FIRECRAWL_API_KEY');
    if (!apiKey) {
      console.error('FIRECRAWL_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Firecrawl to scrape the page with JS rendering
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
        waitFor: 3000, // Wait for JS to render
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
    console.log('Markdown preview:', markdown.substring(0, 500));

    // Extract event data from markdown
    const eventData = extractFromMarkdown(markdown);

    // Try to get image from metadata
    const metadata = firecrawlData.data?.metadata || firecrawlData.metadata;
    if (metadata?.ogImage) {
      eventData.image_url = metadata.ogImage;
    }

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
