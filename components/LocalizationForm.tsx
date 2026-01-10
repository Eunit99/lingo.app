'use client';

import React, { useState } from 'react';

export default function LocalizationForm() {
  const [mode, setMode] = useState<'WEB' | 'TEXT'>('WEB');
  const [url, setUrl] = useState('');
  const [textInput, setTextInput] = useState('');
  const [lingoKey, setLingoKey] = useState('');
  const [selectedLangs, setSelectedLangs] = useState<string[]>(['es', 'fr', 'de']);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  const popularLangs = [
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    { code: 'ja', label: 'Japanese' },
    { code: 'zh', label: 'Chinese' },
    { code: 'pt', label: 'Portuguese' },
    { code: 'it', label: 'Italian' },
    { code: 'ko', label: 'Korean' },
  ];

  const toggleLang = (code: string) => {
    if (selectedLangs.includes(code)) {
      setSelectedLangs(selectedLangs.filter(c => c !== code));
    } else {
      setSelectedLangs([...selectedLangs, code]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const res = await fetch('/api/localize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          url: mode === 'WEB' ? url : undefined,
          text: mode === 'TEXT' ? textInput : undefined,
          lingoApiKey: lingoKey,
          targetLanguages: selectedLangs,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to localize content');
      }
      setResults(data.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="card">
        {/* Mode Toggles */}
        <div className="flex space-x-4 mb-6 border-b border-slate-700/50 pb-4">
          <button
            onClick={() => setMode('WEB')}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${mode === 'WEB' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            Web Scraper
          </button>
          <button
            onClick={() => setMode('TEXT')}
            className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${mode === 'TEXT' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:text-white'}`}
          >
            Text Localizer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'WEB' ? (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Target URL</label>
              <input
                type="url"
                placeholder="https://example.com"
                className="input-field"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required={mode === 'WEB'}
              />
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Text Content</label>
              <textarea
                placeholder="Paste your text here to localize..."
                className="input-field min-h-[150px]"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                required={mode === 'TEXT'}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Target Languages</label>
            <div className="flex flex-wrap gap-2">
              {popularLangs.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => toggleLang(lang.code)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${selectedLangs.includes(lang.code)
                    ? 'bg-indigo-500 text-white border-indigo-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-600'
                    }`}
                >
                  {lang.label} ({lang.code})
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Lingo.dev API Key <span className="text-slate-500 font-normal">(Optional if set in environment)</span>
            </label>
            <input
              type="password"
              placeholder="lin_..."
              className="input-field"
              value={lingoKey}
              onChange={(e) => setLingoKey(e.target.value)}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary flex items-center space-x-2 ${loading ? 'opacity-75 cursor-wait pointer-events-none' : ''}`}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              <span>{loading ? 'Processing...' : 'Localize Content'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Display */}
      {results.length > 0 && (
        <div className="space-y-6 anim-fade-in">
          <h3 className="text-xl font-semibold text-white">Localization Results</h3>
          {results.map((item, idx) => (
            <ResultCard key={idx} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function ResultCard({ item }: { item: any }) {
  const [activeTab, setActiveTab] = useState('original');
  // item has: url, title, original_snippet (maybe), localized_content (object)

  // Normalize localized_content to ensure we can iterate
  const translations = item.localized_content || {};
  const languages = Object.keys(translations);

  return (
    <div className="card overflow-hidden">
      <div className="mb-4">
        <h4 className="text-lg font-medium text-white mb-1">{item.title || 'Untitled Result'}</h4>
        <a href={item.url} target="_blank" className="text-sm text-indigo-400 hover:text-indigo-300 truncate block">{item.url}</a>
      </div>

      <div className="border-b border-slate-700/50 mb-4 flex space-x-4 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab('original')}
          className={`text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'original' ? 'text-white border-b-2 border-indigo-500 pb-1' : 'text-slate-400 hover:text-slate-300'}`}
        >
          Original
        </button>
        {languages.map(lang => (
          <button
            key={lang}
            onClick={() => setActiveTab(lang)}
            className={`text-sm font-medium whitespace-nowrap uppercase transition-colors ${activeTab === lang ? 'text-white border-b-2 border-indigo-500 pb-1' : 'text-slate-400 hover:text-slate-300'}`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm text-slate-300 max-h-96 overflow-y-auto whitespace-pre-wrap">
        {activeTab === 'original'
          ? (item.original_snippet || item.text_content || 'No original content preview available.')
          : (translations[activeTab] || 'Translation not found.')
        }
      </div>
    </div>
  )
}
