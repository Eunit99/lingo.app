import Hero from '@/components/Hero';
import LocalizationForm from '@/components/LocalizationForm';
import Features from '@/components/Features';

export default function Home() {
  return (
    <div className="flex flex-col space-y-24">
      <div className="flex flex-col items-center justify-start space-y-12">
        <Hero />
        <LocalizationForm />
      </div>
      <Features />

      <footer className="w-full py-8 text-center border-t border-slate-800/50 mt-12 text-sm text-slate-500">
        <p>
          Built by <a href="https://eunit.me" target="_blank" className="text-lingo hover:text-lingo-hover transition-colors">Eunit</a>.
          read the <a href="https://www.eunit.me/blog/build-a-global-internationalization-i18n-app-with-nextjs-and-ai" target="_blank" className="text-slate-400 hover:text-white transition-colors underline decoration-slate-600 underline-offset-4 hover:decoration-white">full walkthrough article</a>.
        </p>
      </footer>
    </div>
  );
}
