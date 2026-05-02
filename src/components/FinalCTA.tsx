/* Design philosophy: Brutalismo atlético digital. CTA final usa exclusividade de beta como chamada de arena: entrar antes do lançamento oficial. */
import { ctaCore } from './data';
import WaitlistForm from './WaitlistForm';

export function FinalCTA() {
  return (
    <section id="waitlist" className="py-24">
      <div className="forge-container">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-forge-green/20 bg-black px-6 py-16 text-center shadow-glow sm:px-12 lg:py-24">
          <img src={ctaCore} alt="Núcleo verde brilhante do beta Forge" className="absolute inset-0 h-full w-full object-cover opacity-52" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,.55)_46%,#000_100%)]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[.26em] text-forge-mint">Beta fechado</p>
            <h2 className="mt-5 text-4xl font-black tracking-[-.045em] sm:text-6xl">Entre antes do lançamento oficial.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68">
              Seja um dos primeiros a testar o Forge e ajude a moldar o sistema de progressão para corredores que querem consistência, competição e evolução real.
            </p>
            <div className="mt-9">
              <WaitlistForm />
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[.18em] text-white/38">Sem spam. Convites liberados em ondas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
