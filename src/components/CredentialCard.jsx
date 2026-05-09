import { User } from 'lucide-react'
import attendingImage from '../assets/ATTENDING-FINANCE-EXPO.png'

// Native dimensions of the credential image
const IMAGE_W = 1345
const IMAGE_H = 700

// Pixel-precise photo placeholder bounds (sampled from the navy area in the source PNG)
const PHOTO = { x: 812, y: 66, w: 412, h: 456 }
// Panel that masks the demo "MIGUEL BERNAL" / "Co-founder…" text baked into the image
const NAME_PANEL = { x: 798, y: 535, w: 480, h: 115 }

// Text sizes expressed as % of the credential width — keeps preview/export visually identical
const NAME_FONT_PCT = (32 / IMAGE_W) * 100   // ~2.38%
const ROLE_FONT_PCT = (22 / IMAGE_W) * 100   // ~1.64%
const PANEL_RADIUS_PCT = (12 / IMAGE_W) * 100

const pct = (val, total) => `${(val / total) * 100}%`

/**
 * CredentialCard — Finance Expo Argentina
 * Renders ATTENDING-FINANCE-EXPO.png as the canvas. The user photo overlays
 * the navy placeholder and a green-gradient panel masks the demo text.
 * Aspect 1345:700 (landscape).
 */
export default function CredentialCard({ fullName, empresa, cargo, photo, forExport = false }) {
  const displayName = (fullName?.trim() || 'Tu Nombre').toUpperCase()
  const displayEmpresa = empresa?.trim() || 'Tu Empresa'
  const displayCargo = cargo?.trim() || 'Tu Cargo'

  // === Export-mode: fixed 1345 × 700 px, used by html-to-image ===
  if (forExport) {
    return (
      <div
        style={{
          width: `${IMAGE_W}px`,
          height: `${IMAGE_H}px`,
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Archivo, sans-serif',
          color: '#ffffff',
          background: '#0B3750',
        }}
      >
        <img
          src={attendingImage}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Photo overlay covering the navy placeholder */}
        <div
          style={{
            position: 'absolute',
            left: `${PHOTO.x}px`,
            top: `${PHOTO.y}px`,
            width: `${PHOTO.w}px`,
            height: `${PHOTO.h}px`,
            overflow: 'hidden',
            borderRadius: '28px 32px 70px 10px',
            background: '#0B3750',
          }}
        >
          {photo ? (
            <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #143F58 0%, #0B3750 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User style={{ width: '36%', height: '36%', color: 'rgba(255,255,255,0.25)' }} />
            </div>
          )}
        </div>

        {/* Name + role panel — gradient matches the underlying image so it blends */}
        <div
          style={{
            position: 'absolute',
            left: `${NAME_PANEL.x}px`,
            top: `${NAME_PANEL.y}px`,
            width: `${NAME_PANEL.w}px`,
            height: `${NAME_PANEL.h}px`,
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #218B6A 0%, #3FB289 50%, #4BC898 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '6px',
          }}
        >
          <div
            style={{
              fontFamily: 'Archivo Black, Archivo, sans-serif',
              fontWeight: 900,
              fontSize: '32px',
              color: '#97E402',
              letterSpacing: '-0.5px',
              lineHeight: 1.05,
              wordBreak: 'break-word',
              textTransform: 'uppercase',
            }}
          >
            {displayName}
          </div>
          <div
            style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 500,
              fontSize: '22px',
              color: '#ffffff',
              lineHeight: 1.25,
              wordBreak: 'break-word',
            }}
          >
            <span style={{ fontWeight: 700 }}>{displayCargo}</span>
            <span style={{ color: 'rgba(255,255,255,0.6)', margin: '0 5px' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.9)' }}>{displayEmpresa}</span>
          </div>
        </div>
      </div>
    )
  }

  // === Preview mode: responsive landscape, sizes track the container width via cqw ===
  return (
    <div
      className="w-full relative overflow-hidden rounded-2xl kinetic-shadow"
      style={{
        aspectRatio: `${IMAGE_W} / ${IMAGE_H}`,
        fontFamily: 'Archivo, sans-serif',
        containerType: 'inline-size',
      }}
    >
      <img src={attendingImage} alt="" className="absolute inset-0 w-full h-full object-cover block" />

      {/* Photo overlay */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: pct(PHOTO.x, IMAGE_W),
          top: pct(PHOTO.y, IMAGE_H),
          width: pct(PHOTO.w, IMAGE_W),
          height: pct(PHOTO.h, IMAGE_H),
          borderRadius: '2.1cqw 2.4cqw 5.2cqw 0.75cqw',
          background: '#0B3750',
        }}
      >
        {photo ? (
          <img src={photo} alt="" className="w-full h-full object-cover block" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #143F58 0%, #0B3750 100%)' }}
          >
            <User style={{ width: '36%', height: '36%', color: 'rgba(255,255,255,0.25)' }} />
          </div>
        )}
      </div>

      {/* Name + role panel */}
      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={{
          left: pct(NAME_PANEL.x, IMAGE_W),
          top: pct(NAME_PANEL.y, IMAGE_H),
          width: pct(NAME_PANEL.w, IMAGE_W),
          height: pct(NAME_PANEL.h, IMAGE_H),
          padding: '0.9cqw 1.2cqw',
          borderRadius: `${PANEL_RADIUS_PCT}cqw`,
          background: 'linear-gradient(135deg, #218B6A 0%, #3FB289 50%, #4BC898 100%)',
          gap: '0.45cqw',
        }}
      >
        <div
          className="font-display font-black uppercase"
          style={{
            color: '#97E402',
            fontSize: `${NAME_FONT_PCT}cqw`,
            letterSpacing: '-0.5px',
            lineHeight: 1.05,
            wordBreak: 'break-word',
          }}
        >
          {displayName}
        </div>
        <div
          className="text-white"
          style={{
            fontWeight: 500,
            fontSize: `${ROLE_FONT_PCT}cqw`,
            lineHeight: 1.25,
            wordBreak: 'break-word',
          }}
        >
          <span style={{ fontWeight: 700 }}>{displayCargo}</span>
          <span className="text-white/60 mx-1">·</span>
          <span className="text-white/90">{displayEmpresa}</span>
        </div>
      </div>
    </div>
  )
}
