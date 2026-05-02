/* Design philosophy: Brutalismo atlético digital. Hero assimétrico, mock como prova de produto e fundo HUD verde-neon para reforçar evolução disciplinada. */
import { heroBackground } from './data';
import { ButtonLink } from './ButtonLink';
import { PhoneMockup } from './PhoneMockup';

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 lg:pt-40 pb-24">
      <img src={heroBackground} alt="Fundo técnico escuro com acentos verdes do Forge" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-72" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forge-black/25 via-forge-black/72 to-forge-black" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,.15),transparent_34%)]" />
      <div className="forge-container grid gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <div className="max-w-3xl animate-fadeUp">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-forge-green/30 bg-forge-green/10 px-4 py-2 font-mono text-xs uppercase tracking-[.22em] text-forge-mint">
            <span className="h-2 w-2 rounded-full bg-forge-green animate-pulseGreen" /> Beta fechado em formação
          </div>
          <h1 className="text-balance text-5xl font-black leading-[.92] tracking-[-.06em] text-white sm:text-6xl lg:text-8xl">
            Forge
            <span className="block text-forge-green text-green-glow">forje disciplina.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-8 text-white/72">
            O app de corrida e treino que transforma consistência, evolução física e competição em um sistema de progressão gamificado.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <ButtonLink>Acessar o Forge antecipadamente</ButtonLink>
            <ButtonLink href="#preview" variant="ghost">Ver preview do app</ButtonLink>
          </div>
          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-3">
            {[['14x','streaks'], ['#rank','competição'], ['XP','evolução']].map(([value,label]) => (
              <div key={label} className="forge-border rounded-3xl bg-white/[.035] p-4">
                <dt className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">{label}</dt>
                <dd className="mt-1 text-2xl font-black text-forge-mint">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative animate-fadeUp [animation-delay:.12s] flex justify-center lg:justify-end">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
