import { useRef, useState, useCallback } from 'react'
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Download, Copy, ArrowLeft, Check, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { EVENT } from '../config'
import CredentialCard from './CredentialCard'

function LinkedinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

export default function SuccessScreen({ fullName, empresa, cargo, photo, onBack }) {
  const exportRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    if (!exportRef.current || downloading) return
    setDownloading(true)
    try {
      await new Promise(r => setTimeout(r, 500))
      const dataUrl = await toPng(exportRef.current, {
        width: 1345,
        height: 700,
        pixelRatio: 2,
        cacheBust: true,
      })
      const safeName = fullName.trim().replace(/\s+/g, '_').toLowerCase()
      saveAs(dataUrl, `credencial-${safeName}-FinanceExpoArgentina2026.png`)
      toast.success('Credencial descargada')
    } catch (err) {
      console.error(err)
      toast.error('Error al generar la imagen. Intenta de nuevo.')
    } finally {
      setDownloading(false)
    }
  }, [fullName, downloading])

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EVENT.shareText)
      setCopied(true)
      toast.success('Texto copiado al portapapeles')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('No se pudo copiar el texto')
    }
  }, [])

  const generateImageBlob = useCallback(async () => {
    if (!exportRef.current) return null
    await new Promise(r => setTimeout(r, 500))
    const dataUrl = await toPng(exportRef.current, {
      width: 1345,
      height: 700,
      pixelRatio: 2,
      cacheBust: true,
    })
    const res = await fetch(dataUrl)
    return res.blob()
  }, [])

  const handleLinkedIn = useCallback(async () => {
    if (navigator.share && navigator.canShare) {
      try {
        const blob = await generateImageBlob()
        if (blob) {
          const file = new File([blob], 'credencial-financeexpo-argentina.png', { type: 'image/png' })
          const shareData = {
            text: EVENT.shareText,
            url: EVENT.eventUrl,
            files: [file],
          }
          if (navigator.canShare(shareData)) {
            await navigator.share(shareData)
            return
          }
        }
      } catch (err) {
        if (err.name === 'AbortError') return
      }
    }

    try {
      await navigator.clipboard.writeText(EVENT.shareText + '\n\n' + EVENT.eventUrl)
      toast.success('Texto copiado. Pégalo en tu publicación de LinkedIn y adjunta la imagen descargada.', { duration: 6000 })
    } catch {
      toast.info('Abre LinkedIn, pega el texto promocional y adjunta tu credencial descargada.', { duration: 6000 })
    }
    window.open('https://www.linkedin.com/feed/?shareActive=true', '_blank')
  }, [generateImageBlob])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen"
    >
      {/* Header */}
      <div className="text-center mb-10 md:mb-14">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00DF82] text-[#0B3750] rounded-full mb-6 glow-spring"
        >
          <Check size={16} strokeWidth={3} />
          <span className="text-xs font-display font-black tracking-[0.2em] uppercase">¡Credencial lista!</span>
        </motion.div>
        <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-white uppercase leading-[0.95] mb-4">
          Tu credencial <br className="md:hidden" />
          <span className="text-gradient-spring">está lista</span>
        </h1>
        <p className="text-white/70 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Descárgala y compártela con tu red profesional para <span className="text-white font-semibold">{EVENT.name}</span>.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Credential preview */}
        <div className="lg:col-span-8 flex justify-center">
          <div className="w-full max-w-[760px] relative">
            <div className="absolute -inset-6 bg-[#00DF82]/15 rounded-[2rem] blur-3xl" />
            <div className="relative">
              <CredentialCard fullName={fullName} empresa={empresa} cargo={cargo} photo={photo} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="lg:col-span-4 flex flex-col gap-5 md:gap-6">
          {/* Download & Share buttons */}
          <div className="bg-white p-6 md:p-8 rounded-2xl kinetic-shadow space-y-3 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 brand-gradient" />
            <h3 className="font-display font-black text-[#0B3750] text-lg uppercase tracking-tight mb-4">
              Acciones
            </h3>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full py-4 px-6 bg-[#00DF82] text-[#0B3750] font-display font-black uppercase tracking-tight rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-[#58DDA8] glow-spring disabled:opacity-60"
            >
              {downloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} strokeWidth={2.5} />}
              {downloading ? 'Generando...' : 'Descargar PNG'}
            </button>
            <button
              onClick={handleLinkedIn}
              className="w-full py-4 px-6 bg-[#0B3750] text-white font-display font-black uppercase tracking-tight rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-[#143F58]"
            >
              <LinkedinIcon size={20} />
              Compartir en LinkedIn
            </button>
          </div>

          {/* Promo text */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 md:p-7 rounded-2xl space-y-4">
            <h3 className="text-[11px] font-body font-black tracking-[0.22em] uppercase text-[#58DDA8]">
              Promociona tu participación
            </h3>
            <div className="relative">
              <textarea
                readOnly
                value={EVENT.shareText}
                className="w-full h-36 bg-[#061E2D]/60 border border-white/10 rounded-xl p-4 text-sm font-medium text-white/90 resize-none focus:ring-2 focus:ring-[#00DF82]/40 outline-none"
              />
              <button
                onClick={handleCopy}
                className="absolute bottom-3 right-3 px-3 py-2 bg-[#00DF82] hover:bg-[#58DDA8] text-[#0B3750] rounded-lg transition-colors flex items-center gap-2 text-xs font-display font-black uppercase tracking-wider"
              >
                {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Back */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 text-[#00DF82] font-display font-black text-sm uppercase tracking-tight hover:text-[#58DDA8] transition-colors"
            >
              <ArrowLeft size={18} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" />
              Volver
            </button>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <p className="text-xs text-white/50 font-body uppercase tracking-[0.18em]">
              Crear otra credencial
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 text-center">
        <p className="text-xs text-white/40 font-body uppercase tracking-[0.22em]">
          Esta credencial no tiene validez como entrada al evento.
        </p>
      </div>

      {/* Hidden export render target */}
      <div className="fixed" style={{ left: '-9999px', top: 0 }}>
        <div ref={exportRef}>
          <CredentialCard fullName={fullName} empresa={empresa} cargo={cargo} photo={photo} forExport />
        </div>
      </div>
    </motion.div>
  )
}
