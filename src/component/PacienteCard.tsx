import type { Paciente } from '../types/paciente'
import { BadgeEstado } from './badgeEstado'

interface PacienteCardProps {
  paciente: Paciente
}

export function PacienteCard({ paciente }: PacienteCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-100">
          {paciente.nombre} {paciente.apellido}
        </h3>
        <BadgeEstado estado={paciente.estado} />
      </div>
      
      <div className="space-y-2 text-sm text-gray-300">
        <p>📧 {paciente.email}</p>
        <p>📞 {paciente.telefono}</p>
        <p>🏥 {paciente.especialidadAsignada}</p>
        <p>📅 Última cita: {paciente.ultimaCita}</p>
      </div>
    </div>
  )
}