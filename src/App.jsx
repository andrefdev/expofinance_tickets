import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import CredentialForm from './components/CredentialForm'
import CredentialCard from './components/CredentialCard'
import SuccessScreen from './components/SuccessScreen'
import { EVENT } from './config'

function App() {
  const [fullName, setFullName] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [cargo, setCargo] = useState('')
  const [photo, setPhoto] = useState(null)
  const [screen, setScreen] = useState('form') // 'form' | 'success'

  const handleGenerate = () => {
    setScreen('success')
    window.scrollTo({ top: 0, behavior: 'smooth' })

    if (EVENT.sheetWebhook) {
      fetch(EVENT.sheetWebhook, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          empresa: empresa.trim(),
          cargo: cargo.trim(),
        }),
      }).catch(() => {})
    }
  }

  const handleBack = () => {
    setScreen('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isFormValid =
    fullName.trim().length >= 3 &&
    empresa.trim().length >= 2 &&
    cargo.trim().length >= 2 &&
    photo

  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden brand-gradient-night">
      {/* Decorative background grid + glow */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#00DF82]/15 blur-[120px] z-0" />
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[480px] h-[480px] rounded-full bg-[#58DDA8]/10 blur-[110px] z-0" />

      <Header />

      <main className="relative z-10 flex-1 pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-8 max-w-screen-2xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {screen === 'form' ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
            >
              {/* === Left: Hero + Form === */}
              <section className="space-y-8 md:space-y-10">
                {/* Event tagline pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00DF82] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00DF82]" />
                  </span>
                  <span className="font-body text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-white/90">
                    Visual Identity System · 2025
                  </span>
                </div>

                <div className="space-y-5">
                  <h1 className="font-display font-black text-4xl md:text-5xl lg:text-7xl tracking-[-0.03em] text-white uppercase leading-[0.95]">
                    Obtén tu <br />
                    <span className="text-gradient-spring">Credencial Digital</span>
                  </h1>
                  <p className="text-white/70 text-base md:text-lg max-w-xl leading-relaxed">
                    Crea tu credencial oficial para <span className="text-white font-semibold">{EVENT.name}</span>, la mayor expo global de trading y mercados financieros. Únete a la comunidad que está descifrando el ruido del mercado y convirtiéndolo en decisiones accionables.
                  </p>

                  {/* Event meta */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                      <p className="font-body text-[9px] tracking-widest uppercase text-[#58DDA8] font-bold">Fechas</p>
                      <p className="font-display text-sm md:text-base font-black text-white">{EVENT.date}</p>
                    </div>
                    <div className="px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                      <p className="font-body text-[9px] tracking-widest uppercase text-[#58DDA8] font-bold">Sede</p>
                      <p className="font-display text-sm md:text-base font-black text-white">{EVENT.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Form card */}
                <div className="bg-white p-6 md:p-9 rounded-2xl kinetic-shadow relative overflow-hidden">
                  {/* Top accent stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1 brand-gradient" />
                  <CredentialForm
                    fullName={fullName}
                    setFullName={setFullName}
                    empresa={empresa}
                    setEmpresa={setEmpresa}
                    cargo={cargo}
                    setCargo={setCargo}
                    photo={photo}
                    setPhoto={setPhoto}
                    onGenerate={handleGenerate}
                  />
                </div>

                {/* Disclaimer */}
                <p className="text-xs md:text-sm text-[#97E402] font-body uppercase tracking-[0.18em] text-center font-semibold">
                  Importante: Esta credencial no tiene validez como entrada al evento
                </p>
              </section>

              {/* === Right: Live Preview === */}
              <section className="lg:sticky lg:top-32 flex flex-col items-center">
                <div className="w-full max-w-md relative group">
                  {/* Background glow */}
                  <div className="absolute -inset-6 bg-[#00DF82]/15 rounded-[2rem] blur-3xl group-hover:bg-[#00DF82]/25 transition-all duration-700" />

                  {/* Card */}
                  <div className="relative">
                    <CredentialCard fullName={fullName} empresa={empresa} cargo={cargo} photo={photo} />
                  </div>

                  {/* Live badge */}
                  <div className="absolute -top-4 -right-2 md:-top-5 md:-right-5 bg-[#00DF82] text-[#0B3750] px-4 md:px-5 py-1.5 md:py-2 rounded-full font-display text-[10px] md:text-xs font-black tracking-widest shadow-xl flex items-center gap-2 z-20 glow-spring">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0B3750] opacity-60" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0B3750]" />
                    </span>
                    PREVIEW EN VIVO
                  </div>
                </div>

                <p className="mt-6 md:mt-8 text-white/55 font-body text-[11px] md:text-xs uppercase tracking-[0.2em] text-center max-w-xs">
                  El diseño final puede variar ligeramente según la foto cargada.
                </p>

                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={!isFormValid}
                  className="mt-6 w-full max-w-md bg-[#00DF82] text-[#0B3750] py-4 px-8 rounded-xl font-display font-black text-base md:text-lg uppercase tracking-tight flex items-center justify-center gap-3 transition-all active:scale-95 hover:bg-[#58DDA8] glow-spring disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 disabled:shadow-none"
                >
                  Descargar Credencial
                  <span className="text-xl">→</span>
                </button>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <SuccessScreen
                fullName={fullName}
                empresa={empresa}
                cargo={cargo}
                photo={photo}
                onBack={handleBack}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default App
