/* Design philosophy: Brutalismo atlético digital. Rodapé discreto como assinatura técnica, preservando o foco de conversão. */
export function Footer() {
  return (
    <footer className="border-t border-white/8 py-10">
      <div className="forge-container flex flex-col gap-4 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
        <p><strong className="text-white">Forge</strong> — corrida, treino e progressão gamificada.</p>
        <p className="font-mono uppercase tracking-[.18em]">Beta fechado · 2026</p>
      </div>
    </footer>
  );
}
