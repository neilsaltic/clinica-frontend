import { useState } from 'react'
import { MetricCard } from './component/MetricCard'
import { StatusBadge } from './component/StatusBadge'
import type { Metrica } from './types'
import './App.css'

function App() {
const [enMantenimiento, setEnMantenimiento] = useState(false)

const [pacientes, setPacientes] = useState(128)
const [citasHoy] = useState(14)
const [consultasPendientes] = useState(7)
const [disponibilidad] = useState('98.5%')


const metricas:Metrica[]=[
    {
      id: 'pacientes',
      titulo: 'Pacientes',
      valor: pacientes,
      descripcion: '+12% vs mes anterior',
      tendencia: 'positiva',
      icono: '👥'
    },
    {
      id: 'citas-hoy',
      titulo: 'Citas Hoy',
      valor: citasHoy,
      descripcion: '3 pendientes por confirmar',
      tendencia: 'neutra',
      icono: '📅'
    },
    {
      id: 'consultas',
      titulo: 'Consultas Pendientes',
      valor: consultasPendientes,
      descripcion: '-2 respecto a ayer',
      tendencia: 'negativa',
      icono: '🩺'
    },
    {
      id: 'disponibilidad',
      titulo: 'Disponibilidad',
      valor: disponibilidad,
      descripcion: 'Todos los sistemas activos',
      tendencia: 'positiva',
      icono: '✅'
    }
]

const incrementarPacientes = () => setPacientes(prev => prev + 1)
const decrementarPacientes = () => setPacientes(prev => Math.max(0, prev - 1))
  return (
  <div className='min-h-screen bg-gray-900 text-gray-100'>
    {enMantenimiento && (
      <div className='bg-rose-600 text-white py-3 px-4 text-center font-medium'>
        El sistema esta en Mantenimiento. Algunas funciones no pueden estar disponibles
      </div>
    )}
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Dashboard — Clínica Salud Integral</h1>
          <p className="text-gray-400 mt-1">Bienvenido al panel de control</p>
        </div>
        <StatusBadge activo={!enMantenimiento} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricas.map(metrica => (
          <MetricCard key={metrica.id} metrica={metrica} />
        ))}
      </div>
      <div className="bg-gray-800 rounded-lg shadow p-6 border border-gray-700 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-200">Gestionar Pacientes</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={decrementarPacientes}
              className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-100 transition-colors text-xl font-bold"
            >
              −
            </button>
            <span className="text-xl font-bold w-20 text-center text-gray-100">{pacientes}</span>
            <button
              onClick={incrementarPacientes}
              className="w-10 h-10 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors text-xl font-bold"
            >
              +
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-200">Modo Mantenimiento</h2>
          <button
            onClick={() => setEnMantenimiento(prev => !prev)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              enMantenimiento
                ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                : 'bg-rose-900 text-rose-200 hover:bg-rose-800'
            }`}
          >
            {enMantenimiento ? 'Activar Sistema' : 'Activar Mantenimiento'}
          </button>
        </div>
      </div>
    </div>
  </div>
)
}

export default App
