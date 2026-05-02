/* Design philosophy: Brutalismo atlético digital. Cards atuam como módulos de performance, com métricas mono e bordas luminosas de progressão. */
import { features } from './data';

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="forge-container">
        <div className="mb-12 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[.24em] text-forge-mint">Sistema de progressão</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-6xl">Tudo que mantém você voltando para o próximo treino.</h2>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
          {features.map((feature, index) => (
            <article key={feature.title} className={`forge-card group rounded-[2rem] p-6 h-auto transition duration-200 hover:-translate-y-1 hover:border-forge-green/40 ${index < 2 ? 'lg:col-span-3' : index === 2 ? 'lg:col-span-2' : 'lg:col-span-2'}`}>
              <div className="mb-8 flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[.18em] text-white/48">{feature.tag}</span>
                <span className="font-mono text-3xl font-black text-forge-green transition group-hover:text-forge-mint">{feature.metric}</span>
              </div>
              <h3 className="text-2xl font-black tracking-[-.03em]">{feature.title}</h3>
              <p className="mt-3 leading-7 text-white/62">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
