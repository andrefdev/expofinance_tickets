import { User } from 'lucide-react'
import { EVENT } from '../config'

const ISOTIPO_URL = import.meta.env.BASE_URL + 'assets/financeexpo-isotipo.png'
const ISOTIPO_WHITE_URL = import.meta.env.BASE_URL + 'assets/financeexpo-isotipo-white.png'

/**
 * CredentialCard — FinanceExpo Global
 * Portrait 4:5 (1080 x 1350 export). Built from HTML/CSS following brand guidelines:
 *   - Midnight blue → Sea green → Spring green diagonal gradient
 *   - F+X isotipo watermark
 *   - Archivo Black headlines · Archivo body
 *   - Green-yellow accent strip in the footer
 */
export default function CredentialCard({ fullName, empresa, cargo, photo, forExport = false }) {
  const displayName = fullName?.trim() || 'Tu Nombre Aquí'
  const displayEmpresa = empresa?.trim() || 'Tu Empresa'
  const displayCargo = cargo?.trim() || 'Tu Cargo'

  // Tokens (scaled for export vs preview via the forExport flag)
  const scale = forExport ? 1 : 0.4444 // 1080 / 2430 ≈ 0.444 — but we render container responsive; values below kept absolute for export only
  void scale

  // === Export-mode: fixed 1080 × 1350 px, used by html-to-image ===
  if (forExport) {
    return (
      <div
        style={{
          width: '1080px',
          height: '1350px',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Archivo, sans-serif',
          color: '#ffffff',
          background: '#0B3750',
        }}
      >
        {/* Layered background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 25% 8%, rgba(0,223,130,0.35) 0%, transparent 55%),' +
              'radial-gradient(ellipse at 90% 100%, rgba(88,221,168,0.25) 0%, transparent 55%),' +
              'linear-gradient(160deg, #0B3750 0%, #00644E 60%, #00DF82 110%)',
          }}
        />
        {/* Watermark isotipo — large faded F+X */}
        <img
          src={ISOTIPO_WHITE_URL}
          alt=""
          style={{
            position: 'absolute',
            right: '-160px',
            bottom: '-180px',
            width: '900px',
            height: '900px',
            opacity: 0.06,
            transform: 'rotate(-8deg)',
          }}
        />

        {/* === Top bar === */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            padding: '52px 60px 0 60px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 5,
          }}
        >
          {/* Logo + brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <img src={ISOTIPO_WHITE_URL} alt="" style={{ width: '88px', height: '88px' }} />
            <div style={{ lineHeight: 1 }}>
              <div style={{
                fontFamily: 'Archivo Black, Archivo, sans-serif',
                fontWeight: 900,
                fontSize: '40px',
                color: '#ffffff',
                letterSpacing: '-1px',
              }}>Finance</div>
              <div style={{
                fontFamily: 'Archivo Black, Archivo, sans-serif',
                fontWeight: 900,
                fontSize: '40px',
                color: '#ffffff',
                letterSpacing: '-1px',
                marginTop: '2px',
              }}>Expo</div>
              <div style={{
                fontFamily: 'Archivo, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                color: '#58DDA8',
                letterSpacing: '8px',
                marginTop: '6px',
              }}>GLOBAL</div>
            </div>
          </div>

          {/* Date pill */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'Archivo Black, Archivo, sans-serif',
              fontWeight: 900,
              fontSize: '40px',
              color: '#97E402',
              letterSpacing: '-1px',
              lineHeight: 1,
            }}>29 — 30</div>
            <div style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 700,
              fontSize: '14px',
              color: '#ffffff',
              letterSpacing: '4px',
              marginTop: '6px',
            }}>AGOSTO, 2025</div>
            <div style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 400,
              fontSize: '11px',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '2px',
              marginTop: '6px',
              maxWidth: '180px',
              textTransform: 'uppercase',
            }}>{EVENT.venue}<br/>{EVENT.venueDetail}</div>
          </div>
        </div>

        {/* === Photo (with diagonal cut bottom-right, F-shape inspired) === */}
        <div
          style={{
            position: 'absolute',
            top: '260px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '480px',
            height: '480px',
            zIndex: 5,
          }}
        >
          {/* Outer green frame */}
          <div style={{
            position: 'absolute',
            inset: '-12px',
            background: 'linear-gradient(135deg, #00DF82 0%, #58DDA8 60%, #00644E 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)',
          }} />
          {/* Photo container */}
          <div style={{
            position: 'absolute',
            inset: 0,
            overflow: 'hidden',
            clipPath: 'polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)',
            background: '#0B3750',
          }}>
            {photo ? (
              <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(135deg, #143F58 0%, #0B3750 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <User style={{ width: '32%', height: '32%', color: 'rgba(255,255,255,0.25)' }} />
              </div>
            )}
          </div>
        </div>

        {/* === Name + role + company === */}
        <div
          style={{
            position: 'absolute',
            top: '790px',
            left: '60px',
            right: '60px',
            textAlign: 'center',
            zIndex: 5,
          }}
        >
          {/* "ATTENDEE" tag */}
          <div style={{
            display: 'inline-block',
            padding: '6px 18px',
            background: 'rgba(151, 228, 2, 0.18)',
            border: '1.5px solid #97E402',
            borderRadius: '999px',
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 800,
            fontSize: '13px',
            color: '#97E402',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            marginBottom: '24px',
          }}>ATTENDEE</div>

          <h2 style={{
            fontFamily: 'Archivo Black, Archivo, sans-serif',
            fontWeight: 900,
            fontSize: '70px',
            color: '#ffffff',
            textTransform: 'uppercase',
            letterSpacing: '-2px',
            lineHeight: 1.02,
            margin: 0,
            wordBreak: 'break-word',
            textShadow: '0 4px 18px rgba(0,0,0,0.35)',
          }}>
            {displayName}
          </h2>

          <div style={{
            marginTop: '18px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 700,
              fontSize: '24px',
              color: '#58DDA8',
              letterSpacing: '4px',
              textTransform: 'uppercase',
            }}>{displayCargo}</span>
            <span style={{
              fontFamily: 'Archivo, sans-serif',
              fontWeight: 500,
              fontSize: '22px',
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '1px',
              wordBreak: 'break-word',
            }}>{displayEmpresa}</span>
          </div>
        </div>

        {/* === Footer green-yellow strip === */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '22px 60px',
          background: 'linear-gradient(90deg, #97E402 0%, #00DF82 100%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 5,
        }}>
          <span style={{
            fontFamily: 'Archivo Black, Archivo, sans-serif',
            fontWeight: 900,
            fontSize: '22px',
            color: '#0B3750',
            letterSpacing: '-0.5px',
            textTransform: 'uppercase',
          }}>The Global Expo of Trading</span>
          <span style={{
            fontFamily: 'Archivo, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            color: '#0B3750',
            letterSpacing: '2px',
          }}>finsummit.com</span>
        </div>
      </div>
    )
  }

  // === Preview mode: responsive 4:5 portrait ===
  return (
    <div className="w-full aspect-[4/5] relative overflow-hidden rounded-2xl kinetic-shadow"
      style={{
        background: '#0B3750',
        fontFamily: 'Archivo, sans-serif',
        color: '#ffffff',
      }}
    >
      {/* Layered background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 25% 8%, rgba(0,223,130,0.35) 0%, transparent 55%),' +
            'radial-gradient(ellipse at 90% 100%, rgba(88,221,168,0.25) 0%, transparent 55%),' +
            'linear-gradient(160deg, #0B3750 0%, #00644E 60%, #00DF82 110%)',
        }}
      />
      {/* Watermark isotipo */}
      <img
        src={ISOTIPO_WHITE_URL}
        alt=""
        className="absolute pointer-events-none"
        style={{
          right: '-15%',
          bottom: '-15%',
          width: '85%',
          opacity: 0.06,
          transform: 'rotate(-8deg)',
        }}
      />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 px-[5.5%] pt-[4.5%] flex justify-between items-start z-10">
        <div className="flex items-center gap-2 md:gap-3">
          <img src={ISOTIPO_WHITE_URL} alt="" className="w-[14%] min-w-[36px] aspect-square" style={{ width: '14%' }} />
          <div className="leading-none">
            <div className="font-display font-black text-white" style={{ fontSize: 'clamp(11px, 4.2vw, 22px)', letterSpacing: '-0.5px' }}>Finance</div>
            <div className="font-display font-black text-white mt-[2px]" style={{ fontSize: 'clamp(11px, 4.2vw, 22px)', letterSpacing: '-0.5px' }}>Expo</div>
            <div className="font-body font-medium text-[#58DDA8] mt-1" style={{ fontSize: 'clamp(5px, 1.5vw, 8px)', letterSpacing: '4px' }}>GLOBAL</div>
          </div>
        </div>

        <div className="text-right">
          <div className="font-display font-black text-[#97E402] leading-none" style={{ fontSize: 'clamp(13px, 4.4vw, 22px)', letterSpacing: '-0.5px' }}>29 — 30</div>
          <div className="font-body font-bold text-white mt-1" style={{ fontSize: 'clamp(6px, 1.6vw, 8px)', letterSpacing: '2px' }}>AGOSTO, 2025</div>
          <div className="font-body text-white/70 mt-1" style={{ fontSize: 'clamp(5px, 1.3vw, 7px)', letterSpacing: '1px', textTransform: 'uppercase', maxWidth: '110px', marginLeft: 'auto' }}>
            {EVENT.venue}<br/>{EVENT.venueDetail}
          </div>
        </div>
      </div>

      {/* Photo */}
      <div className="absolute z-10" style={{ top: '19%', left: '50%', transform: 'translateX(-50%)', width: '46%', aspectRatio: '1 / 1' }}>
        <div className="absolute" style={{
          inset: '-3%',
          background: 'linear-gradient(135deg, #00DF82 0%, #58DDA8 60%, #00644E 100%)',
          clipPath: 'polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)',
        }} />
        <div className="absolute inset-0 overflow-hidden bg-[#0B3750]" style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)',
        }}>
          {photo ? (
            <img src={photo} alt="" className="w-full h-full object-cover block" />
          ) : (
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #143F58 0%, #0B3750 100%)' }}>
              <User style={{ width: '32%', height: '32%', color: 'rgba(255,255,255,0.25)' }} />
            </div>
          )}
        </div>
      </div>

      {/* Name + role */}
      <div className="absolute left-[5.5%] right-[5.5%] z-10 text-center" style={{ top: '60%' }}>
        <div className="inline-block px-3 py-[3px] rounded-full mb-3"
          style={{
            background: 'rgba(151, 228, 2, 0.18)',
            border: '1px solid #97E402',
            color: '#97E402',
            fontSize: 'clamp(7px, 1.7vw, 10px)',
            fontWeight: 800,
            letterSpacing: '4px',
          }}>ATTENDEE</div>

        <h2 className="font-display font-black uppercase m-0 leading-[1.02] text-white"
          style={{
            fontSize: 'clamp(14px, 5.5vw, 32px)',
            letterSpacing: '-1px',
            wordBreak: 'break-word',
            textShadow: '0 4px 18px rgba(0,0,0,0.35)',
          }}>
          {displayName}
        </h2>

        <div className="flex flex-col items-center mt-2" style={{ gap: 'clamp(1px, 0.4vw, 4px)' }}>
          <span className="font-body font-bold uppercase text-[#58DDA8]"
            style={{ fontSize: 'clamp(8px, 2.2vw, 13px)', letterSpacing: '2.5px' }}>
            {displayCargo}
          </span>
          <span className="font-body font-medium text-white/85"
            style={{ fontSize: 'clamp(7px, 2vw, 12px)', letterSpacing: '0.5px', wordBreak: 'break-word' }}>
            {displayEmpresa}
          </span>
        </div>
      </div>

      {/* Footer strip */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex justify-between items-center px-[5.5%]"
        style={{
          background: 'linear-gradient(90deg, #97E402 0%, #00DF82 100%)',
          paddingTop: '2.2%', paddingBottom: '2.2%',
        }}>
        <span className="font-display font-black uppercase text-[#0B3750]"
          style={{ fontSize: 'clamp(7px, 2vw, 11px)', letterSpacing: '-0.3px' }}>
          The Global Expo of Trading
        </span>
        <span className="font-body font-bold text-[#0B3750]"
          style={{ fontSize: 'clamp(6px, 1.5vw, 8px)', letterSpacing: '1.5px' }}>
          finsummit.com
        </span>
      </div>
    </div>
  )
}
