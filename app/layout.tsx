import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lingo.app - Globalize Your Web',
  description: 'Instantly localize any website or text into 83+ languages using AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 selection:bg-indigo-500/30`}>
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <header className="flex justify-between items-center py-6 mb-12">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center transform rotate-3">
                <span className="text-xl font-bold text-white">L</span>
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">lingo.app</span>
            </div>
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-400">
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="https://apify.com/eunit/ai-website-content-localizer-scraper" target="_blank" className="hover:text-white transition-colors">Apify Actor</a>
              <a href="https://lingo.dev" target="_blank" className="hover:text-white transition-colors">Lingo.dev</a>
            </nav>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
