import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Camera, X } from 'lucide-react'
import { toast } from 'sonner'
import CargoSelect from './CargoSelect'
import ImageCropper from './ImageCropper'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = { 'image/jpeg': [], 'image/png': [], 'image/webp': [] }

export default function CredentialForm({ fullName, setFullName, empresa, setEmpresa, cargo, setCargo, photo, setPhoto, onGenerate }) {
  const [rawImage, setRawImage] = useState(null) // image before cropping
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

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="font-body text-xs font-extrabold tracking-widest text-on-surface-variant uppercase">
            Nombre y Apellido <span className="text-secondary">*</span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Ej. Ana García"
            maxLength={60}
            className="w-full bg-surface-low border-none focus:ring-2 focus:ring-primary-container px-4 py-4 rounded-lg font-body text-lg transition-all placeholder:text-outline-variant outline-none"
          />
          {fullName.length > 0 && trimmedName.length < 3 && (
            <p className="text-secondary-dim text-xs font-medium">Mínimo 3 caracteres</p>
          )}
        </div>

        {/* Empresa */}
        <div className="space-y-2">
          <label className="font-body text-xs font-extrabold tracking-widest text-on-surface-variant uppercase">
            Empresa a la que representas <span className="text-secondary">*</span>
          </label>
          <input
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Ej. Grupo Empresarial XYZ"
            maxLength={80}
            className="w-full bg-surface-low border-none focus:ring-2 focus:ring-primary-container px-4 py-4 rounded-lg font-body text-lg transition-all placeholder:text-outline-variant outline-none"
          />
        </div>

        {/* Cargo */}
        <div className="space-y-2">
          <label className="font-body text-xs font-extrabold tracking-widest text-on-surface-variant uppercase">
            Cargo <span className="text-secondary">*</span>
          </label>
          <CargoSelect value={cargo} onChange={setCargo} />
        </div>

        {/* Photo upload (required) */}
        <div className="space-y-2">
          <label className="font-body text-xs font-extrabold tracking-widest text-on-surface-variant uppercase">
            Foto <span className="text-secondary">*</span>
          </label>
          {photo ? (
            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-surface-low">
              <img src={photo} alt="Preview" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute top-2 right-2 w-8 h-8 bg-dark/60 hover:bg-dark/80 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl bg-surface-low cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-outline-variant/30 hover:bg-surface-high/50'
              }`}
            >
              <input {...getInputProps()} />
              <Camera size={32} className="text-primary mb-2" />
              <p className="text-sm text-on-surface-variant">
                {isDragActive ? 'Suelta tu imagen aquí' : 'Click para cargar o arrastra tu imagen'}
              </p>
              <p className="text-xs text-outline-variant mt-1">Formatos: JPG, PNG, WEBP · Máx 5 MB</p>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className="w-full bg-primary text-white py-4 md:py-5 px-8 rounded-xl font-headline font-extrabold text-lg uppercase tracking-tight flex items-center justify-center gap-3 transition-all active:scale-95 hover:bg-primary-dim kinetic-shadow disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          Generar Credencial
          <span className="text-xl">→</span>
        </button>
      </form>

      {/* Crop modal */}
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
