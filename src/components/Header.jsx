import { EVENT } from '../config'

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-dark/90 backdrop-blur-xl">
      <div className="flex justify-between items-center px-6 md:px-8 h-16 md:h-20 w-full max-w-screen-2xl mx-auto">
        <img
          src="/assets/20capece.png"
          alt="CAPECE - 20 Aniversario"
          className="h-8 md:h-10 w-auto"
        />
        <img
          src={EVENT.logo}
          alt="SHE/COMMERCE"
          className="h-5 md:h-7 w-auto"
        />
      </div>
    </header>
  )
}
