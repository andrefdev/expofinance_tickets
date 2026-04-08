export default function Footer() {
  return (
    <footer className="w-full py-6 md:py-8 bg-dark mt-auto">
      <div className="flex flex-col items-center gap-3 px-6 md:px-8 max-w-screen-2xl mx-auto text-center">
        <p className="text-white/30 font-body text-[10px] uppercase tracking-widest">
          © 2026 Shecommerce · CAPECE
        </p>
        <a
          href="https://indrox.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 opacity-40 hover:opacity-70 transition-opacity"
        >
          <span className="text-white/50 font-body text-[9px] tracking-wider">powered by</span>
          <img
            src="https://indrox.com/logo-white.svg"
            alt="Indrox"
            className="h-3 w-auto"
          />
        </a>
      </div>
    </footer>
  )
}
