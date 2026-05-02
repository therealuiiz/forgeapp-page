/* Design philosophy: Brutalismo atlético digital. Ícones são lineares, técnicos e usam acento verde para reforçar progressão sem diluir a estética dark. */
import type { SVGProps } from 'react';

export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>;
}
export function TrophyIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v6a5 5 0 0 1-10 0V4Z"/><path d="M5 5H3v3a4 4 0 0 0 4 4"/><path d="M19 5h2v3a4 4 0 0 1-4 4"/></svg>;
}
export function BoltIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z"/></svg>;
}
export function MedalIcon(props: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M8 2h8l-2 7h-4L8 2Z"/><circle cx="12" cy="15" r="5"/><path d="m10.7 15.4.9.9 2-2.6"/></svg>;
}
