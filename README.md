# Lingo.app

A premium AI-powered localization tool built with Next.js, TailwindCSS, and Apify.

## Features

- **Website Localization**: Scrape and localize any URL.
- **Text Localization**: Translate raw text with context.
- **AI-Powered**: Uses Lingo.dev via Apify for high-quality translations.
- **Premium UI**: Designed with modern aesthetics and responsiveness.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables in `.env.local`:
   ```bash
   # Required for Actor execution
   APIFY_API_TOKEN=your_apify_token
   
   # Optional: Pre-configured Lingo key (can also be entered in UI)
   LINGO_API_KEY=your_lingo_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Architecture

- **Frontend**: Next.js App Router, TailwindCSS components.
- **Backend API**: Next.js API Routes acting as a proxy to Apify.
- **Integration**: `apify-client` triggers the `eunit/ai-website-content-localizer-scraper` Actor.

## Credits

- Built by [Your Name/Team]
- Powered by [Apify](https://apify.com) & [Lingo.dev](https://lingo.dev)
