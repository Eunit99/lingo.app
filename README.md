# Lingo.app

A premium AI-powered localization tool built with Next.js, TailwindCSS, and [Apify](https://www.apify.com?fpr=eunit).

![Screenshot 1](./screenshots/screenshot1.png)

## Features

- **Website Localization**: Scrape and localize any URL.
- **Text Localization**: Translate raw text with context.
- **AI-Powered**: Uses Lingo.dev via [Apify](https://www.apify.com?fpr=eunit) for high-quality translations.
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
- **Integration**: `apify-client` triggers the [eunit/ai-website-content-localizer-scraper](https://apify.com/eunit/ai-website-content-localizer-scraper) Actor.

## Credits

- Built by [Eunit](https://eunit.me)
- Read the detailed article on [Eunit.me](build-a-global-internationalization-i18n-app-with-nextjs-and-ai)
- Powered by [Apify](https://apify.com) & [Lingo.dev](https://lingo.dev)
