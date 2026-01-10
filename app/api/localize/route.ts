import { NextResponse } from 'next/server';
import { runLocalizerActor } from '@/lib/apify';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { url, text, mode, targetLanguages, lingoApiKey } = body;

    const apifyToken = process.env.APIFY_API_TOKEN;

    if (!apifyToken) {
      return NextResponse.json({ error: "Server misconfigured: APIFY_API_TOKEN missing. Please set it in .env.local" }, { status: 500 });
    }

    const finalLingoKey = lingoApiKey || process.env.LINGO_API_KEY;
    if (!finalLingoKey) {
      return NextResponse.json({ error: "Lingo API Key is required. Please provide it in the form or set LINGO_API_KEY env." }, { status: 400 });
    }

    if (mode === 'TEXT' && text && text.length > 500) {
      return NextResponse.json({ error: "Text content exceeds the 500 character limit." }, { status: 400 });
    }

    const startUrls = url ? [{ url }] : undefined;

    // Default languages if not provided
    const languages = targetLanguages && targetLanguages.length > 0 ? targetLanguages : ['es', 'fr', 'de'];

    const items = await runLocalizerActor({
      token: apifyToken,
      lingoApiKey: finalLingoKey,
      mode: mode as 'WEB' | 'TEXT',
      targetLanguages: languages,
      startUrls,
      text
    });

    return NextResponse.json({ success: true, data: items || [] });
  } catch (error: any) {
    console.error("API Route Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Unknown error" }, { status: 500 });
  }
}
