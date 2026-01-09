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
    </div>
  );
}
