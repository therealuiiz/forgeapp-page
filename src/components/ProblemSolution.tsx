/* Design philosophy: Brutalismo atlético digital. Esta seção usa contraste problema/solução como painel de diagnóstico e protocolo de progressão. */
import { problems, solutions } from './data';

export function ProblemSolution() {
  return (
    <section id="problema" className="relative py-24">
      <div className="absolute inset-0 grid-mask opacity-50" />
      <div className="forge-container relative grid gap-6 lg:grid-cols-2">
        <div className="forge-card rounded-[2rem] p-7 sm:p-10">
          <span className="font-mono text-xs uppercase tracking-[.24em] text-forge-red">O atrito</span>
          <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-.04em] sm:text-5xl">Registrar treino não é o mesmo que criar hábito.</h2>
          <div className="mt-8 space-y-4">
            {problems.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-3xl border border-white/8 bg-black/35 p-5">
                <span className="font-mono text-sm text-forge-red">0{index + 1}</span>
                <p className="text-white/68">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="forge-card rounded-[2rem] border-forge-green/20 bg-forge-green/[.045] p-7 sm:p-10">
          <span className="font-mono text-xs uppercase tracking-[.24em] text-forge-mint">A solução Forge</span>
          <h2 className="mt-4 max-w-xl text-4xl font-black tracking-[-.04em] sm:text-5xl">Progresso visível antes da motivação acabar.</h2>
          <div className="mt-8 space-y-4">
            {solutions.map((item, index) => (
              <div key={item} className="flex gap-4 rounded-3xl border border-forge-green/15 bg-forge-green/[.06] p-5">
                <span className="font-mono text-sm text-forge-mint">0{index + 1}</span>
                <p className="text-white/76">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
