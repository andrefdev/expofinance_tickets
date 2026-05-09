import { EVENT } from '../config'

export default function Footer() {
  return (
    <footer className="relative z-10 w-full py-8 md:py-10 mt-auto border-t border-white/5 bg-[#061E2D]/60 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-5 px-6 md:px-8 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img
            src={EVENT.isotipo}
            alt=""
            className="w-7 h-7"
          />
          <div className="leading-tight">
            <p className="text-white/80 font-display font-black text-xs uppercase tracking-tight">
              {EVENT.name}
            </p>
            <p className="text-white/40 font-body text-[10px] uppercase tracking-[0.2em]">
              © {EVENT.year} · {EVENT.dateLabel} · {EVENT.venueDetail}
            </p>
          </div>
        </div>

        {/* Powered by */}
        <a
          href="https://indrox.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-50 hover:opacity-90 transition-opacity"
        >
          <span className="text-white/60 font-body text-[11px] tracking-wider">powered by</span>
          <img
            src="https://indrox.com/logo-white.svg"
            alt="Indrox"
            className="h-5 w-auto"
          />
        </a>
      </div>
    </footer>
  )
}
