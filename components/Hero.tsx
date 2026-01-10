import React from 'react';

export default function Hero() {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-6">
      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
        <span>Powered by Lingo.dev & Apify</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
        Globalize your <span className="text-indigo-500">content</span> instantly.
      </h1>
      <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
        Scrape any website and translate it into 83+ languages with context-aware AI.
        The ultimate tool for shipping global apps fast.
      </p>
    </div>
  );
}
