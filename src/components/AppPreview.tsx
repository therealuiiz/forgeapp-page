/* Design philosophy: Brutalismo atlético digital. Preview reforça produto real: mock técnico, arena visual e métricas de progressão em camadas. */
import { previewArena } from './data';
import { PhoneMockup } from './PhoneMockup';

export function AppPreview() {
  return (
    <section id="preview" className="relative overflow-hidden py-24">
      <div className="absolute inset-x-0 top-1/2 h-[520px] -translate-y-1/2 bg-forge-green/5 blur-3xl" />
      <div className="forge-container">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black p-5 shadow-card sm:p-8 lg:p-12">
          <img src={previewArena} alt="Ecossistema visual do app Forge com rankings, medalhas e rotas" className="absolute inset-0 h-full w-full object-cover opacity-34" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/74 to-black/36" />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[.95fr_1.05fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[.24em] text-forge-mint">Preview do app</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-6xl">Um painel de evolução, não só um diário de treino.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/68">
                O Forge organiza seu histórico, ranking, medalhas e streaks em uma experiência que deixa claro onde você está e qual é o próximo avanço.
              </p>
              <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
                {[['Ranking', 'Suba posições'], ['Medalhas', 'Desbloqueie marcos'], ['Streak', 'Proteja a sequência']].map(([title, text]) => (
                  <div key={title} className="rounded-3xl border border-forge-green/15 bg-forge-green/[.06] p-4">
                    <strong className="block text-forge-mint">{title}</strong>
                    <span className="text-sm text-white/58">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
