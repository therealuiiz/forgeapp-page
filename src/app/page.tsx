/* Design philosophy: Brutalismo atlético digital. Página composta em seções de alto contraste, narrativa curta e CTA recorrente para beta fechado. */
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProblemSolution } from '@/components/ProblemSolution';
import { Features } from '@/components/Features';
import { AppPreview } from '@/components/AppPreview';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-forge-black text-white">
      <Navbar />
      <Hero />
      <ProblemSolution />
      <Features />
      <AppPreview />
      <FinalCTA />
      <Footer />
    </main>
  );
}
