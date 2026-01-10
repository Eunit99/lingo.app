import { ApifyClient } from 'apify-client';

export interface LocalizerInput {
  token: string;
  lingoApiKey: string;
  mode: 'WEB' | 'TEXT';
  targetLanguages: string[];
  startUrls?: { url: string }[];
  text?: string;
}

export const runLocalizerActor = async (params: LocalizerInput) => {
  const { token, lingoApiKey, mode, targetLanguages, startUrls, text } = params;

  const client = new ApifyClient({
    token: token,
  });

  const input = {
    mode,
    lingoApiKey,
    targetLanguages,
    startUrls: mode === 'WEB' ? startUrls : undefined,
    text: mode === 'TEXT' ? text : undefined,
  };

  try {
    // Run the Actor and wait for it to finish
    const run = await client.actor("eunit/ai-website-content-localizer-scraper").call(input);

    if (!run) {
      throw new Error("Actor run failed to start or return.");
    }

    if (run.status !== 'SUCCEEDED') {
      throw new Error(`Actor run failed with status: ${run.status}`);
    }

    // Fetch results from dataset
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    return items;
  } catch (error) {
    console.error("Apify Actor Run Error:", error);
    throw error;
  }
};
