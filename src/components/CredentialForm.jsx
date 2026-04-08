import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Camera, X } from 'lucide-react'
import { toast } from 'sonner'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = { 'image/jpeg': [], 'image/png': [], 'image/webp': [] }

export default function CredentialForm({ fullName, setFullName, photo, setPhoto, onGenerate }) {
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
      reader.onload = () => setPhoto(reader.result)
      reader.readAsDataURL(file)
    }
  }, [setPhoto])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: false,
  })

  const trimmedName = fullName.trim()
  const isValid = trimmedName.length >= 3 && trimmedName.length <= 60

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) {
      toast.error('Ingresa un nombre válido (mínimo 3 caracteres)')
      return
    }
    onGenerate()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Name input */}
      <div className="space-y-2">
        <label className="font-body text-xs font-extrabold tracking-widest text-on-surface-variant uppercase">
          Nombre y Apellido
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

      {/* Photo upload */}
      <div className="space-y-2">
        <label className="font-body text-xs font-extrabold tracking-widest text-on-surface-variant uppercase">
          Subir Foto (Opcional)
        </label>
        {photo ? (
          <div className="relative w-full h-40 rounded-xl overflow-hidden bg-surface-low">
            <img src={photo} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => setPhoto(null)}
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
            <p className="text-xs text-outline-variant mt-1">JPG, PNG o WEBP · Máx 5 MB</p>
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
  )
}
