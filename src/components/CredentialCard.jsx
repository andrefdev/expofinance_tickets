import { EVENT } from '../config'
import { User } from 'lucide-react'

/*
  The credential SVG (credencial.svg) has:
  - viewBox: 0 0 720 903.33
  - Photo placeholder: white rect at (209.91, 250.35) size 300.17 x 300.17
  - All branding, logos, and event text baked in as vector paths

  We overlay the user's photo and name at the correct % positions.
  Photo area: left ~29.15%, top ~27.72%, width ~41.69%, height ~33.23%
  Name area: centered horizontally, below photo (~62-70% from top)
*/

const SVG_URL = '/assets/credencial.svg'

// Photo position as % of the SVG viewBox (720 x 903.33)
const PHOTO = {
  left: (209.91 / 720) * 100,       // ~29.15%
  top: (250.35 / 903.33) * 100,     // ~27.72%
  width: (300.17 / 720) * 100,      // ~41.69%
  height: (300.17 / 903.33) * 100,  // ~33.23%
}

// Name area: centered, below the photo + baked-in text
const NAME_TOP = ((250.35 + 300.17 + 80) / 903.33) * 100 + 5 // ~74.8%

export default function CredentialCard({ fullName, photo, forExport = false }) {
  const displayName = fullName?.trim() || 'Tu Nombre Aquí'

  if (forExport) {
    return (
      <div style={{
        width: '1080px',
        height: '1354px', // 720:903.33 scaled to 1080 width -> height ≈ 1354
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Manrope, sans-serif',
      }}>
        {/* SVG background */}
        <img
          src={SVG_URL}
          alt=""
          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'fill' }}
        />

        {/* Photo overlay */}
        <div style={{
          position: 'absolute',
          left: `${PHOTO.left}%`,
          top: `${PHOTO.top}%`,
          width: `${PHOTO.width}%`,
          height: `${PHOTO.height}%`,
          overflow: 'hidden',
        }}>
          {photo ? (
            <img src={photo} alt="Foto" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              background: '#e2e2e2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <User style={{ width: '30%', height: '30%', color: '#adadad' }} />
            </div>
          )}
        </div>

        {/* Name overlay */}
        <div style={{
          position: 'absolute',
          left: '10%',
          right: '10%',
          top: `${NAME_TOP}%`,
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 900,
            fontSize: '42px',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            lineHeight: 1.15,
            wordBreak: 'break-word',
            margin: 0,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            {displayName}
          </h2>
        </div>
      </div>
    )
  }

  // Preview version
  return (
    <div className="w-full aspect-[720/903.33] relative overflow-hidden rounded-2xl kinetic-shadow bg-dark">
      {/* SVG background */}
      <img
        src={SVG_URL}
        alt=""
        className="w-full h-full block object-fill"
      />

      {/* Photo overlay */}
      <div
        className="absolute overflow-hidden"
        style={{
          left: `${PHOTO.left}%`,
          top: `${PHOTO.top}%`,
          width: `${PHOTO.width}%`,
          height: `${PHOTO.height}%`,
        }}
      >
        {photo ? (
          <img src={photo} alt="Foto" className="w-full h-full object-cover block" />
        ) : (
          <div className="w-full h-full bg-surface-high flex items-center justify-center">
            <User className="text-outline-variant" style={{ width: '30%', height: '30%' }} />
          </div>
        )}
      </div>

      {/* Name overlay */}
      <div
        className="absolute left-[10%] right-[10%] text-center"
        style={{ top: `${NAME_TOP}%` }}
      >
        <h2
          className="font-headline font-black uppercase text-white leading-tight m-0"
          style={{
            fontSize: 'clamp(12px, 4.5vw, 26px)',
            letterSpacing: '0.05em',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            wordBreak: 'break-word',
          }}
        >
          {displayName}
        </h2>
      </div>
    </div>
  )
}
