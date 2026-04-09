import { useRef, useState, useCallback } from 'react'
import { toPng } from 'html-to-image'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'
import { Download, Copy, ArrowLeft, Check, Loader2 } from 'lucide-react'

function LinkedinIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
import { motion } from 'framer-motion'
import { EVENT } from '../config'
import CredentialCard from './CredentialCard'

export default function SuccessScreen({ fullName, empresa, cargo, photo, onBack }) {
  const exportRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const handleDownload = useCallback(async () => {
    if (!exportRef.current || downloading) return
    setDownloading(true)
    try {
      // Wait for fonts/images to fully load
      await new Promise(r => setTimeout(r, 500))
      const dataUrl = await toPng(exportRef.current, {
        width: 1080,
        height: 1350,
        pixelRatio: 1,
        cacheBust: true,
      })
      const safeName = fullName.trim().replace(/\s+/g, '_').toLowerCase()
      saveAs(dataUrl, `credencial-${safeName}-FBS2026.png`)
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
      width: 1080,
      height: 1350,
      pixelRatio: 1,
      cacheBust: true,
    })
    const res = await fetch(dataUrl)
    return res.blob()
  }, [])

  const handleLinkedIn = useCallback(async () => {
    // Try Web Share API first (mobile + some desktop browsers)
    if (navigator.share && navigator.canShare) {
      try {
        const blob = await generateImageBlob()
        if (blob) {
          const file = new File([blob], 'credencial-shecommerce.png', { type: 'image/png' })
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
        // User cancelled or API not supported for files, fall through to fallback
        if (err.name === 'AbortError') return
      }
    }

    // Fallback: copy text to clipboard, then open LinkedIn
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
      <div className="text-center mb-8 md:mb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary-container text-secondary-dim rounded-full mb-6"
        >
          <Check size={14} />
          <span className="text-xs font-body font-bold tracking-widest uppercase">¡Credencial lista!</span>
        </motion.div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-headline tracking-tighter text-on-surface mb-4">
          ¡Tu credencial está lista!
        </h1>
        <p className="text-on-surface-variant max-w-xl mx-auto text-base md:text-lg leading-relaxed">
          Descárgala y compártela con tu red profesional para el {EVENT.name}.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Credential preview */}
        <div className="lg:col-span-7 flex justify-center">
          <div className="w-full max-w-[480px]">
            <CredentialCard fullName={fullName} empresa={empresa} cargo={cargo} photo={photo} />
          </div>
        </div>

        {/* Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
          {/* Download & Share buttons */}
          <div className="bg-surface-white p-6 md:p-8 rounded-xl kinetic-shadow space-y-4">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full py-4 px-6 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-primary-dim disabled:opacity-60"
            >
              {downloading ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
              {downloading ? 'Generando...' : 'Descargar PNG'}
            </button>
            <button
              onClick={handleLinkedIn}
              className="w-full py-4 px-6 bg-secondary text-white font-bold rounded-xl flex items-center justify-center gap-3 active:scale-95 transition-all hover:opacity-90"
            >
              <LinkedinIcon size={20} />
              Compartir en LinkedIn
            </button>
          </div>

          {/* Promo text */}
          <div className="bg-surface-low p-6 md:p-8 rounded-xl space-y-4">
            <h3 className="text-xs font-body font-black tracking-widest uppercase text-on-surface-variant">
              Promociona tu participación
            </h3>
            <div className="relative">
              <textarea
                readOnly
                value={EVENT.shareText}
                className="w-full h-32 bg-surface-white border-none rounded-lg p-4 text-sm font-medium text-on-surface resize-none focus:ring-2 focus:ring-primary-container outline-none"
              />
              <button
                onClick={handleCopy}
                className="absolute bottom-3 right-3 p-2 bg-surface-high hover:bg-outline-variant/30 rounded-lg transition-colors flex items-center gap-2 text-xs font-bold"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                {copied ? 'Copiado' : 'Copiar texto'}
              </button>
            </div>
          </div>

          {/* Back */}
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="group flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Volver
            </button>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <p className="text-xs text-on-surface-variant font-body uppercase tracking-wider">
              Crear otra credencial
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-12 text-center">
        <p className="text-xs text-outline-variant font-body uppercase tracking-widest">
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
