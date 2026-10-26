import { useEffect, useState } from 'react'
import { MetricCard } from '../component/MetricCard'
import { StatusBadge } from '../component/StatusBadge'
import type { Metrica } from '../types'
import { Link } from 'react-router-dom'
import { api } from '../libs/axios' // Ajusta según tu ruta

interface DashboardPageProps {
  enMantenimiento: boolean
  onToggleMantenimiento: () => void
}

export function DashboardPage({ enMantenimiento, onToggleMantenimiento }: DashboardPageProps) {
  const [totalPacientes, setTotalPacientes] = useState<number | null>(null)
  const [totalMedicos, setTotalMedicos] = useState<number | null>(null)
  const [citasProgramadas, setCitasProgramadas] = useState<number | null>(null)
  const [citasCompletadas, setCitasCompletadas] = useState<number | null>(null)

  useEffect(() => {
    // 1. Pacientes
    api.get('/pacientes')
      .then((res) => setTotalPacientes(res.data.total ?? res.data.data?.length))
      .catch((err) => console.error("Error cargando pacientes:", err))

    // 2. Médicos
    api.get('/medicos')
      .then((res) => setTotalMedicos(res.data.total ?? res.data.data?.length))
      .catch((err) => console.error("Error cargando médicos:", err))

    // 3. Citas Programadas
    api.get('/citas?estado=PROGRAMADA')
      .then((res) => setCitasProgramadas(res.data.total ?? res.data.data?.length))
      .catch((err) => console.error("Error cargando citas programadas:", err))

    // 4. Citas Completadas
    api.get('/citas?estado=COMPLETADA')
      .then((res) => setCitasCompletadas(res.data.total ?? res.data.data?.length))
      .catch((err) => console.error("Error cargando citas completadas:", err))
  }, [])

  const metricas: Metrica[] = [
    { id: 'pacientes', titulo: 'Pacientes', valor: totalPacientes ?? '...', descripcion: 'Total registrados', tendencia: 'positiva', icono: '👥' },
    { id: 'citas-hoy', titulo: 'Citas Programadas', valor: citasProgramadas ?? '...', descripcion: 'Pendientes', tendencia: 'neutra', icono: '📅' },
    { id: 'consultas', titulo: 'Completadas Hoy', valor: citasCompletadas ?? '...', descripcion: 'Atendidas', tendencia: 'positiva', icono: '🩺' },
    { id: 'disponibilidad', titulo: 'Médicos', valor: totalMedicos ?? '...', descripcion: 'Activos en el sistema', tendencia: 'positiva', icono: '✅' }
  ]

  return (
    <div>
      {enMantenimiento && (
        <div className='bg-rose-600 text-white py-3 px-4 text-center font-medium mb-6 rounded-lg'>
          El sistema está en Mantenimiento. Algunas funciones no estarán disponibles
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Dashboard — Clínica Salud Integral</h1>
          <p className="text-gray-400 mt-1">Bienvenido al panel de control</p>
        </div>
        <StatusBadge activo={!enMantenimiento} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricas.map(m => <MetricCard key={m.id} metrica={m} />)}
      </div>

      <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-200">Modo Mantenimiento</h2>
          <button onClick={onToggleMantenimiento}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              enMantenimiento ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-rose-900 text-rose-200 hover:bg-rose-800'
            }`}>
            {enMantenimiento ? 'Activar Sistema' : 'Activar Mantenimiento'}
          </button>
        </div>
      </div>
      <Link
        to="/pacientes"
        className="inline-block mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
      >
        Ver Pacientes →
      </Link>
    </div>
  )
}