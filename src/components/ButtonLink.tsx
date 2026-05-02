/* Design philosophy: Brutalismo atlético digital. CTAs funcionam como comandos de entrada no beta: contraste alto, brilho verde e feedback rápido. */
import { ArrowIcon } from './Icons';

type ButtonLinkProps = { children: React.ReactNode; href?: string; variant?: 'primary' | 'ghost'; className?: string };

export function ButtonLink({ children, href = '#waitlist', variant = 'primary', className = '' }: ButtonLinkProps) {
  const base = 'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-extrabold uppercase tracking-[.16em] transition duration-200 focus:outline-none focus:ring-2 focus:ring-forge-green focus:ring-offset-2 focus:ring-offset-forge-black';
  const styles = variant === 'primary'
    ? 'bg-forge-green text-black shadow-glow hover:bg-forge-mint hover:-translate-y-0.5'
    : 'border border-white/12 bg-white/[.03] text-white hover:border-forge-green/60 hover:text-forge-mint';
  return <a href={href} className={`${base} ${styles} ${className}`}>{children}<ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" /></a>;
}
