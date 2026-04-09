import { User } from 'lucide-react'

const SVG_URL = import.meta.env.BASE_URL + 'assets/credencial.svg'

// Photo position as % of the SVG viewBox (720 x 903.33)
const PHOTO = {
  left: (209.91 / 720) * 100,
  top: (250.35 / 903.33) * 100,
  width: (300.17 / 720) * 100,
  height: (300.17 / 903.33) * 100,
}

// Name area: centered, below the photo + baked-in text (subido 2%)
const NAME_TOP = ((250.35 + 300.17 + 80) / 903.33) * 100 + 3 // ~72.8%

export default function CredentialCard({ fullName, empresa, cargo, photo, forExport = false }) {
  const displayName = fullName?.trim() || 'Tu Nombre Aquí'
  const displayEmpresa = empresa?.trim() || ''
  const displayCargo = cargo?.trim() || ''

  if (forExport) {
    return (
      <div style={{
        width: '1080px',
        height: '1350px',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'Manrope, sans-serif',
        backgroundColor: '#000000',
      }}>
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

        {/* Name + cargo + empresa overlay */}
        <div style={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          top: `${NAME_TOP}%`,
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 700,
            fontSize: '42px',
            color: '#fcbf0d',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            lineHeight: 1.15,
            wordBreak: 'break-word',
            margin: 0,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}>
            {displayName}
          </h2>
          {(displayCargo || displayEmpresa) && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}>
              {displayCargo && (
                <span style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: '32px',
                  color: '#ffffff',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {displayCargo}
                </span>
              )}
              {displayEmpresa && (
                <span style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: '32px',
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                  wordBreak: 'break-word',
                }}>
                  {displayEmpresa}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Preview version
  return (
    <div className="w-full aspect-[720/903.33] relative overflow-hidden rounded-2xl kinetic-shadow bg-dark">
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

      {/* Name + cargo + empresa overlay */}
      <div
        className="absolute left-[8%] right-[8%] text-center"
        style={{ top: `${NAME_TOP}%` }}
      >
        <h2
          className="font-headline font-bold uppercase leading-tight m-0"
          style={{
            fontSize: 'clamp(10px, 4.5vw, 16px)',
            letterSpacing: '0.05em',
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
            wordBreak: 'break-word',
            color: "#fcbf0d"
          }}
        >
          {displayName}
        </h2>
        {(displayCargo || displayEmpresa) && (
          <div className="flex flex-col items-center" style={{ gap: 'clamp(0px, 0.3vw, 3px)' }}>
            {displayCargo && (
              <span
                className="font-body font-semibold uppercase"
                style={{
                  fontSize: 'clamp(7px, 2.8vw, 15px)',
                  color: '#ffffff',
                  letterSpacing: '0.1em',
                }}
              >
                {displayCargo}
              </span>
            )}
            {displayEmpresa && (
              <span
                className="font-body font-semibold"
                style={{
                  fontSize: 'clamp(7px, 2.8vw, 15px)',
                  color: '#ffffff',
                  letterSpacing: '0.05em',
                  wordBreak: 'break-word',
                }}
              >
                {displayEmpresa}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
