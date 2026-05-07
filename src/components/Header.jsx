import { EVENT } from '../config'

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#061E2D]/85 border-b border-white/5">
      <div className="flex justify-between items-center px-5 md:px-8 h-16 md:h-20 w-full max-w-screen-2xl mx-auto">
        {/* Logo principal */}
        <a href={EVENT.eventUrl} className="flex items-center gap-3 group">
          <img
            src={EVENT.logoWhite}
            alt={`${EVENT.name} logo`}
            className="h-8 md:h-11 w-auto transition-transform group-hover:scale-[1.02]"
          />
        </a>

        {/* Fecha + sede */}
        <div className="hidden md:flex items-center gap-4 text-white/80">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00DF82] animate-pulse" />
            <span className="font-body text-[11px] tracking-[0.18em] uppercase font-semibold">
              {EVENT.date}
            </span>
          </div>
          <span className="w-px h-4 bg-white/15" />
          <span className="font-body text-[11px] tracking-[0.18em] uppercase">
            {EVENT.venue}
          </span>
        </div>

        {/* Mobile date pill */}
        <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00DF82] animate-pulse" />
          <span className="font-body text-[9px] tracking-widest uppercase text-white/85 font-semibold">
            29-30 AGO
          </span>
        </div>
      </div>
    </header>
  )
}
