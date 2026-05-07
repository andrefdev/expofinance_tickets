import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Search } from 'lucide-react'

const CARGOS = [
  'CEO / Director General',
  'CFO / Director Financiero',
  'COO / Director de Operaciones',
  'CMO / Director de Marketing',
  'CTO / Director de Tecnología',
  'Director Comercial',
  'Director de Recursos Humanos',
  'Director de Ventas',
  'Trader / Day Trader',
  'Portfolio Manager',
  'Risk Manager',
  'Wealth Manager',
  'Financial Analyst',
  'Investment Banker',
  'Quant / Algorithmic Trader',
  'Forex Trader',
  'Crypto Trader',
  'Introducing Broker',
  'Gerente General',
  'Gerente de Área',
  'Gerente de Proyecto',
  'Gerente de Producto',
  'Jefe de Departamento',
  'Coordinador',
  'Analista',
  'Consultor',
  'Asesor',
  'Fundador / Co-Fundador',
  'Socio',
  'Presidente',
  'Vicepresidente',
  'Emprendedor',
  'Freelancer',
  'Estudiante',
  'Docente / Profesor',
  'Investigador',
  'Otro',
]

export default function CargoSelect({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [isOther, setIsOther] = useState(false)
  const [customCargo, setCustomCargo] = useState('')
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = CARGOS.filter((c) =>
    c.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (cargo) => {
    if (cargo === 'Otro') {
      setIsOther(true)
      setCustomCargo('')
      onChange('')
      setOpen(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      setIsOther(false)
      onChange(cargo)
      setOpen(false)
      setSearch('')
    }
  }

  const handleCustomChange = (e) => {
    setCustomCargo(e.target.value)
    onChange(e.target.value)
  }

  const inputCls =
    "flex-1 bg-[#F5F8F7] border border-transparent focus:border-[#00DF82] focus:bg-white focus:ring-4 focus:ring-[#00DF82]/15 px-4 py-4 rounded-xl font-body text-base md:text-lg text-[#0B3750] transition-all placeholder:text-[#9FB3BE] outline-none"

  if (isOther) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={customCargo}
            onChange={handleCustomChange}
            placeholder="Escribe tu cargo"
            maxLength={60}
            className={inputCls}
          />
          <button
            type="button"
            onClick={() => {
              setIsOther(false)
              onChange('')
              setSearch('')
            }}
            className="px-4 py-4 rounded-xl bg-[#DCE5E1] text-[#0B3750] hover:bg-[#9FB3BE]/40 font-body text-sm font-bold transition-colors shrink-0"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full bg-[#F5F8F7] border border-transparent px-4 py-4 rounded-xl font-body text-base md:text-lg text-left flex items-center justify-between transition-all outline-none ${open ? 'border-[#00DF82] bg-white ring-4 ring-[#00DF82]/15' : 'hover:bg-white hover:border-[#DCE5E1]'}`}
      >
        <span className={value ? 'text-[#0B3750] font-medium' : 'text-[#9FB3BE]'}>
          {value || 'Selecciona tu cargo'}
        </span>
        <ChevronDown size={20} className={`text-[#6B8392] transition-transform ${open ? 'rotate-180 text-[#00DF82]' : ''}`} />
      </button>

      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white rounded-xl kinetic-shadow border border-[#DCE5E1] overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-[#DCE5E1] bg-[#F5F8F7]">
            <Search size={16} className="text-[#6B8392] shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar cargo..."
              className="flex-1 bg-transparent border-none outline-none font-body text-sm text-[#0B3750] placeholder:text-[#9FB3BE] py-1"
              autoFocus
            />
          </div>

          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-[#9FB3BE] text-center">
                Sin resultados
              </div>
            ) : (
              filtered.map((cargo) => (
                <button
                  key={cargo}
                  type="button"
                  onClick={() => handleSelect(cargo)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-body transition-colors hover:bg-[#00DF82]/10 ${
                    cargo === value
                      ? 'bg-[#00DF82]/15 text-[#00644E] font-bold'
                      : 'text-[#0B3750]'
                  } ${cargo === 'Otro' ? 'border-t border-[#DCE5E1] font-semibold text-[#00644E]' : ''}`}
                >
                  {cargo}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
