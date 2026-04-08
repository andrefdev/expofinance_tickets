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
  }

  const handleBack = () => {
    setScreen('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 pt-24 md:pt-32 pb-16 md:pb-20 px-4 md:px-8 max-w-screen-2xl mx-auto w-full">
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
              {/* Left: Form */}
              <section className="space-y-8 md:space-y-12">
                <div className="space-y-4">
                  <h1 className="font-headline font-black text-4xl md:text-5xl lg:text-7xl tracking-tighter text-on-surface uppercase">
                    Obtén Tu <br />
                    <span className="text-primary">Credencial Digital</span>
                  </h1>
                  <p className="text-on-surface-variant text-base md:text-xl max-w-lg leading-relaxed">
                    Crea tu credencial oficial para el {EVENT.name}. {EVENT.subtitle}.
                  </p>
                </div>

                <div className="bg-surface-white p-6 md:p-10 rounded-xl kinetic-shadow">
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
                <p className="text-xs text-outline-variant font-body uppercase tracking-widest text-center lg:text-left">
                  Esta credencial no tiene validez como entrada al evento.
                </p>
              </section>

              {/* Right: Live Preview */}
              <section className="lg:sticky lg:top-32 flex flex-col items-center">
                <div className="w-full max-w-md relative group">
                  {/* Background glow */}
                  <div className="absolute -inset-4 bg-secondary/10 rounded-3xl blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />

                  {/* Card */}
                  <div className="relative">
                    <CredentialCard fullName={fullName} photo={photo} />
                  </div>

                  {/* Live badge */}
                  <div className="absolute -top-4 -right-2 md:-top-6 md:-right-6 bg-secondary text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full font-body text-[10px] md:text-xs font-black tracking-widest shadow-xl flex items-center gap-2 z-20">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
                    </span>
                    PREVIEW EN VIVO
                  </div>
                </div>
                <p className="mt-6 md:mt-8 text-on-surface-variant font-body text-xs md:text-sm uppercase tracking-widest text-center max-w-xs">
                  El diseño final puede variar ligeramente según la foto cargada.
                </p>
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
