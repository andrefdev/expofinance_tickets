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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061E2D]/85 backdrop-blur-md p-4">
      <div className="bg-white rounded-2xl overflow-hidden w-full max-w-lg kinetic-shadow flex flex-col relative">
        {/* Top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 brand-gradient" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#DCE5E1]">
          <h3 className="font-display font-black text-[#0B3750] text-base uppercase tracking-tight">Recortar foto</h3>
          <button
            onClick={onCancel}
            className="text-[#6B8392] hover:text-[#0B3750] transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F5F8F7]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cropper area */}
        <div className="relative w-full aspect-square bg-[#0B3750]">
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
        <div className="flex items-center gap-3 px-5 py-3 bg-[#F5F8F7]">
          <ZoomOut size={16} className="text-[#6B8392] shrink-0" />
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="flex-1 h-1.5 bg-[#DCE5E1] rounded-full appearance-none cursor-pointer"
            style={{ accentColor: '#00DF82' }}
          />
          <ZoomIn size={16} className="text-[#6B8392] shrink-0" />
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 py-4 border-t border-[#DCE5E1]">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl font-display font-black text-sm uppercase tracking-tight text-[#4A6373] bg-[#F5F8F7] hover:bg-[#DCE5E1] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl font-display font-black text-sm uppercase tracking-tight text-[#0B3750] bg-[#00DF82] hover:bg-[#58DDA8] transition-colors flex items-center justify-center gap-2 glow-spring"
          >
            <Check size={18} />
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}
