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
            className="flex-1 bg-surface-low border-none focus:ring-2 focus:ring-primary-container px-4 py-4 rounded-lg font-body text-lg transition-all placeholder:text-outline-variant outline-none"
          />
          <button
            type="button"
            onClick={() => {
              setIsOther(false)
              onChange('')
              setSearch('')
            }}
            className="px-3 py-4 rounded-lg bg-surface-high text-on-surface-variant hover:bg-outline-variant/30 font-body text-sm font-bold transition-colors shrink-0"
          >
            Volver
          </button>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-surface-low border-none px-4 py-4 rounded-lg font-body text-lg text-left flex items-center justify-between transition-all outline-none focus:ring-2 focus:ring-primary-container"
      >
        <span className={value ? 'text-on-surface' : 'text-outline-variant'}>
          {value || 'Selecciona tu cargo'}
        </span>
        <ChevronDown size={20} className={`text-outline transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-surface-white rounded-xl kinetic-shadow border border-surface-high/50 overflow-hidden">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 border-b border-surface-high">
            <Search size={16} className="text-outline shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar cargo..."
              className="flex-1 bg-transparent border-none outline-none font-body text-sm placeholder:text-outline-variant py-1"
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-outline-variant text-center">
                Sin resultados
              </div>
            ) : (
              filtered.map((cargo) => (
                <button
                  key={cargo}
                  type="button"
                  onClick={() => handleSelect(cargo)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-body transition-colors hover:bg-primary/5 ${
                    cargo === value ? 'bg-primary/10 text-primary font-bold' : 'text-on-surface'
                  } ${cargo === 'Otro' ? 'border-t border-surface-high font-semibold text-secondary' : ''}`}
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
