interface BuscadorPacientesProps {
  value: string
  onChange: (valor: string) => void
}

export function BuscadorPacientes({ value, onChange }: BuscadorPacientesProps) {
  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar paciente..."
        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
    </div>
  )
}