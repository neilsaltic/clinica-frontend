import { useState } from 'react'
import { DashboardPage } from './pages/DshboardPage'
import { PacientesPage } from './pages/PacientesPage'
import { FormularioCita } from './pages/formularioCitas'
import './App.css'

function App() {
  const [enMantenimiento, setEnMantenimiento] = useState(false)
  const [pagina, setPagina] = useState<'dashboard' | 'pacientes' | 'citas'>('dashboard')

  return (
    <div className='min-h-screen bg-gray-900 text-gray-100 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Navegación */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setPagina('dashboard')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              pagina === 'dashboard' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => setPagina('pacientes')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              pagina === 'pacientes' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            👥 Pacientes
          </button>
          <button
            onClick={() => setPagina('citas')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              pagina === 'citas' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            📅 Nueva Cita
          </button>
        </div>

        {/* Contenido */}
        {pagina === 'dashboard' && (
          <DashboardPage
            enMantenimiento={enMantenimiento}
            onToggleMantenimiento={() => setEnMantenimiento(prev => !prev)}
          />
        )}
        {pagina === 'pacientes' && <PacientesPage />}
        {pagina === 'citas' && <FormularioCita />}
      </div>
    </div>
  )
}

export default App