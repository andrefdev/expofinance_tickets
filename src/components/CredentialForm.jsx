import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Camera, X } from 'lucide-react'
import { toast } from 'sonner'
import CargoSelect from './CargoSelect'
import ImageCropper from './ImageCropper'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = { 'image/jpeg': [], 'image/png': [], 'image/webp': [] }

export default function CredentialForm({ fullName, setFullName, empresa, setEmpresa, cargo, setCargo, photo, setPhoto, onGenerate }) {
  const [rawImage, setRawImage] = useState(null)
  const [showCropper, setShowCropper] = useState(false)

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const err = rejectedFiles[0].errors[0]
      if (err.code === 'file-too-large') {
        toast.error('La imagen debe pesar menos de 5 MB')
      } else if (err.code === 'file-invalid-type') {
        toast.error('Solo se aceptan JPG, PNG o WEBP')
      }
      return
    }
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const reader = new FileReader()
      reader.onload = () => {
        setRawImage(reader.result)
        setShowCropper(true)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  })

  const handleCropDone = useCallback((croppedImage) => {
    setPhoto(croppedImage)
    setShowCropper(false)
    setRawImage(null)
  }, [setPhoto])

  const handleCropCancel = useCallback(() => {
    setShowCropper(false)
    setRawImage(null)
  }, [])

  const handleRemovePhoto = () => {
    setPhoto(null)
    setRawImage(null)
  }

  const trimmedName = fullName.trim()
  const trimmedEmpresa = empresa.trim()
  const isValid = trimmedName.length >= 3 && trimmedName.length <= 60
    && trimmedEmpresa.length >= 2
    && cargo.trim().length >= 2
    && photo !== null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (trimmedName.length < 3) {
      toast.error('Ingresa un nombre válido (mínimo 3 caracteres)')
      return
    }
    if (trimmedEmpresa.length < 2) {
      toast.error('Ingresa el nombre de tu empresa')
      return
    }
    if (cargo.trim().length < 2) {
      toast.error('Selecciona o ingresa tu cargo')
      return
    }
    if (!photo) {
      toast.error('Sube una foto para tu credencial')
      return
    }
    onGenerate()
  }

  const labelCls =
    "font-body text-[11px] font-extrabold tracking-[0.18em] text-[#0B3750] uppercase"
  const inputCls =
    "w-full bg-[#F5F8F7] border border-transparent focus:border-[#00DF82] focus:bg-white focus:ring-4 focus:ring-[#00DF82]/15 px-4 py-4 rounded-xl font-body text-base md:text-lg text-[#0B3750] transition-all placeholder:text-[#9FB3BE] outline-none"

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Section header */}
        <div className="pb-2 border-b border-[#DCE5E1]">
          <h3 className="font-display font-black text-[#0B3750] text-lg md:text-xl uppercase tracking-tight leading-none">
            Tus datos
          </h3>
          <p className="font-body text-xs text-[#4A6373] mt-1">Completa los campos para generar tu credencial.</p>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className={labelCls}>
            Nombre y Apellido <span className="text-[#00DF82]">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ej. Charles Martos"
            maxLength={60}
            className={inputCls}
          />
          {fullName.length > 0 && trimmedName.length < 3 && (
            <p className="text-[#C92C7A] text-xs font-semibold">Mínimo 3 caracteres</p>
          )}
        </div>

        {/* Cargo */}
        <div className="space-y-2">
          <label className={labelCls}>
            Cargo <span className="text-[#00DF82]">*</span>
          </label>
          <CargoSelect value={cargo} onChange={setCargo} />
        </div>

        {/* Empresa */}
        <div className="space-y-2">
          <label className={labelCls}>
            Empresa a la que representas <span className="text-[#00DF82]">*</span>
          </label>
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Ej. Star Trader"
            maxLength={80}
            className={inputCls}
          />
        </div>

        {/* Photo upload */}
        <div className="space-y-2">
          <label className={labelCls}>
            Foto <span className="text-[#00DF82]">*</span>
          </label>
          {photo ? (
            <div className="relative w-full h-44 rounded-xl overflow-hidden bg-[#F5F8F7] ring-1 ring-[#00DF82]/40">
              <img src={photo} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 w-9 h-9 bg-[#0B3750]/80 hover:bg-[#0B3750] text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                aria-label="Eliminar foto"
              >
                <X size={18} />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-[#00DF82] text-[#0B3750] text-[10px] font-display font-black tracking-widest uppercase">
                Listo
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center w-full h-44 border-2 border-dashed rounded-xl bg-[#F5F8F7] cursor-pointer transition-all ${
                isDragActive
                  ? 'border-[#00DF82] bg-[#00DF82]/5 scale-[1.01]'
                  : 'border-[#9FB3BE]/40 hover:border-[#00DF82]/50 hover:bg-[#00DF82]/5'
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-12 h-12 rounded-full bg-[#00DF82]/10 flex items-center justify-center mb-2">
                <Camera size={22} className="text-[#00644E]" />
              </div>
              <p className="text-sm text-[#0B3750] font-semibold">
                {isDragActive ? 'Suelta tu imagen aquí' : 'Click para cargar o arrastra'}
              </p>
              <p className="text-xs text-[#6B8392] mt-1">JPG, PNG, WEBP · Máx 5 MB</p>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-[#0B3750] text-white py-4 md:py-5 px-8 rounded-xl font-display font-black text-base md:text-lg uppercase tracking-tight flex items-center justify-center gap-3 transition-all active:scale-95 hover:bg-[#143F58] kinetic-shadow disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 group"
        >
          Generar Credencial
          <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
        </button>
      </form>

      {showCropper && rawImage && (
        <ImageCropper
          imageSrc={rawImage}
          onCropDone={handleCropDone}
          onCancel={handleCropCancel}
        />
      )}
    </>
  )
}
