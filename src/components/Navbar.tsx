/* Design philosophy: Brutalismo atlético digital. Navegação compacta como barra técnica, sem template genérico, com logo e CTA sempre claros. */
import { ButtonLink } from './ButtonLink';

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-forge-black/70 backdrop-blur-xl">
      <nav className="forge-container flex h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label="Forge início">
          <img 
            src="/images/forge-logo.png" 
            alt="Forge logo" 
            style={{
              height: '40px',
              width: 'auto',
              display: 'block',
            }}
          />
          <span className="text-xl font-black tracking-tight">Forge</span>
        </a>
        <div className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[.18em] text-white/55 md:flex">
          <a className="transition hover:text-forge-mint" href="#problema">Problema</a>
          <a className="transition hover:text-forge-mint" href="#features">Features</a>
          <a className="transition hover:text-forge-mint" href="#preview">Preview</a>
        </div>
        <ButtonLink className="hidden px-5 py-2.5 text-xs sm:inline-flex">Entrar no beta</ButtonLink>
      </nav>
    </header>
  );
}
