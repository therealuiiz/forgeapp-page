/* Design philosophy: Brutalismo atlético digital. O mock simula o app real com superfícies OLED, métricas mono, badges e glow verde de progressão. */
import { MedalIcon, TrophyIcon, BoltIcon } from './Icons';

const leaderboard = [
  ['01', 'Marina V.', '92 XP'],
  ['02', 'Lucas R.', '88 XP'],
  ['03', 'Você', '84 XP'],
];

export function PhoneMockup() {
  return (
    <div 
      style={{
        width: 'clamp(280px, 90vw, 360px)',
        height: 'auto',
        maxHeight: '720px',
        aspectRatio: '9 / 16',
        margin: '0 auto',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <div className="absolute -inset-8 rounded-[44px] bg-forge-green/20 blur-3xl" />
      <div 
        className="relative overflow-hidden rounded-[42px] border border-white/15 bg-black p-3 shadow-card phone-sweep before:absolute before:left-1/2 before:top-2 before:z-20 before:h-6 before:w-24 before:-translate-x-1/2 before:rounded-full before:bg-black"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div 
          className="relative overflow-y-auto rounded-[32px] border border-white/10 bg-[#0b0b0b] p-5 phone-mockup-scroll"
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div className="absolute inset-0 grid-mask opacity-60" />
          <div className="relative z-10">
            <div className="mb-7 flex items-center justify-between pt-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.22em] text-forge-muted">Forge OS</p>
                <h3 className="text-xl font-black">Semana 14</h3>
              </div>
              <div className="rounded-full border border-forge-green/40 bg-forge-green/10 p-2 text-forge-green"><BoltIcon className="h-5 w-5" /></div>
            </div>

            <div className="rounded-3xl border border-forge-green/25 bg-forge-green/10 p-4 green-glow">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[.22em] text-forge-mint">Streak ativo</span>
                <span className="font-mono text-xs text-white/70">14 dias</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-black/60">
                <div className="h-full w-[74%] rounded-full bg-gradient-to-r from-forge-green to-forge-mint" />
              </div>
              <p className="mt-3 text-sm text-white/72">+320 XP até o próximo nível</p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[['42K','KM'], ['8','MEDALHAS'], ['#03','RANK']].map(([value,label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[.04] p-3 text-center">
                  <strong className="block text-lg font-black text-white">{value}</strong>
                  <span className="font-mono text-[9px] tracking-[.16em] text-forge-muted">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-3xl border border-white/10 bg-white/[.035] p-4">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-bold">Ranking semanal</h4>
                <TrophyIcon className="h-5 w-5 text-forge-green" />
              </div>
              <div className="space-y-3">
                {leaderboard.map(([pos, name, xp], index) => (
                  <div key={name} className={`flex items-center justify-between rounded-2xl border p-3 ${index === 2 ? 'border-forge-green/35 bg-forge-green/10' : 'border-white/8 bg-black/30'}`}>
                    <div className="flex items-center gap-3"><span className="font-mono text-xs text-forge-muted">{pos}</span><span className="text-sm font-bold">{name}</span></div>
                    <span className="font-mono text-xs text-forge-mint">{xp}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-3xl border border-white/10 bg-white/[.035] p-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[.2em] text-forge-muted">Conquista</p>
                <p className="font-bold">Ritmo de aço</p>
              </div>
              <div className="rounded-2xl border border-forge-green/30 bg-forge-green/10 p-3 text-forge-mint"><MedalIcon className="h-6 w-6" /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
