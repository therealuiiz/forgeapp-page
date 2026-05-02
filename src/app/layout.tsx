import type { Metadata } from 'next';
import { JetBrains_Mono, Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: 'Forge — Treine como quem evolui de nível',
  description: 'Entre no beta fechado do Forge, o app de corrida e treino que transforma consistência, rankings e conquistas em progresso real.',
  openGraph: {
    title: 'Forge — Treine como quem evolui de nível',
    description: 'Corrida, treino e gamificação para manter consistência e evolução física ao longo do tempo.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
