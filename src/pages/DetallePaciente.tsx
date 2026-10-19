import { useParams, useNavigate, Link } from 'react-router-dom'
import type { Paciente } from '../types/paciente'
import { BadgeEstado } from '../component/badgeEstado'
import { NotFoundPage } from './NotFoundPage'

// Datos compartidos (mover a un archivo central después)
const PACIENTES_INICIALES: Paciente[] = [
  { id: 'p1', nombre: 'María', apellido: 'González', email: 'maria.g@clinicasalud.com', telefono: '+591 777 12345', especialidadAsignada: 'Medicina General', ultimaCita: '2026-10-10', estado: 'activo' },
  { id: 'p2', nombre: 'Juan', apellido: 'Pérez', email: 'juan.p@clinicasalud.com', telefono: '+591 777 67890', especialidadAsignada: 'Cardiología', ultimaCita: '2026-10-08', estado: 'en_espera' },
  { id: 'p3', nombre: 'Ana', apellido: 'Rodríguez', email: 'ana.r@clinicasalud.com', telefono: '+591 777 54321', especialidadAsignada: 'Dermatología', ultimaCita: '2026-09-15', estado: 'inactivo' },
  { id: 'p4', nombre: 'Carlos', apellido: 'Mendoza', email: 'carlos.m@clinicasalud.com', telefono: '+591 777 98765', especialidadAsignada: 'Traumatología', ultimaCita: '2026-10-12', estado: 'activo' },
  { id: 'p5', nombre: 'Sofía', apellido: 'Vásquez', email: 'sofia.v@clinicasalud.com', telefono: '+591 777 45678', especialidadAsignada: 'Pediatría', ultimaCita: '2026-10-05', estado: 'en_espera' }
]

export function DetallePacientePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const paciente = PACIENTES_INICIALES.find(p => p.id === id)

  if (!paciente) {
    return <NotFoundPage />
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-emerald-400 hover:text-emerald-300 font-medium"
      >
        ← Volver
      </button>

      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-100">
            {paciente.nombre} {paciente.apellido}
          </h1>
          <BadgeEstado estado={paciente.estado} />
        </div>

        <div className="space-y-4 text-lg text-gray-300">
          <p><strong className="text-gray-100">📧 Email:</strong> {paciente.email}</p>
          <p><strong className="text-gray-100">📞 Teléfono:</strong> {paciente.telefono || 'No registrado'}</p>
          <p><strong className="text-gray-100">🏥 Especialidad:</strong> {paciente.especialidadAsignada}</p>
          <p><strong className="text-gray-100">📅 Última cita:</strong> {paciente.ultimaCita}</p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            to="/citas/nueva"
            className="flex-1 text-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
          >
            📅 Agendar Cita
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}