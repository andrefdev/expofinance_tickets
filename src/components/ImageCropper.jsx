import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Check, X, ZoomIn, ZoomOut } from 'lucide-react'
import getCroppedImg from '../utils/cropImage'

export default function ImageCropper({ imageSrc, onCropDone, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((_croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels)
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!croppedAreaPixels) return
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels)
    onCropDone(croppedImage)
  }, [imageSrc, croppedAreaPixels, onCropDone])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/80 backdrop-blur-sm p-4">
      <div className="bg-surface-white rounded-2xl overflow-hidden w-full max-w-lg kinetic-shadow flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-high">
          <h3 className="font-headline font-bold text-on-surface text-base">Recortar foto</h3>
          <button onClick={onCancel} className="text-outline hover:text-on-surface transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Cropper area */}
        <div className="relative w-full aspect-square bg-dark">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="rect"
            showGrid={false}
          />
        </div>

        {/* Zoom control */}
        <div className="flex items-center gap-3 px-5 py-3">
          <ZoomOut size={16} className="text-outline shrink-0" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 h-1.5 bg-surface-high rounded-full appearance-none cursor-pointer accent-primary"
          />
          <ZoomIn size={16} className="text-outline shrink-0" />
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4 border-t border-surface-high">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-on-surface-variant bg-surface-high hover:bg-surface-high/80 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-primary hover:bg-primary-dim transition-colors flex items-center justify-center gap-2"
          >
            <Check size={18} />
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
