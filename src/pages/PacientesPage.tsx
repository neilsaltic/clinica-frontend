import { useEffect, useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Paciente, EstadoPaciente } from '../types/paciente'
import { PacienteCard } from '../component/PacienteCard'
import { api } from '../libs/axios' // Ajusta según tu ruta

type FiltroEstado = EstadoPaciente | 'Todos'

export function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('Todos')

  const cargarPacientes = () => {
    setCargando(true)
    setError(false)
    api.get('/pacientes')
      .then((res) => {
        // Asegúrate de que extraiga correctamente el array (res.data.data o res.data)
        const lista = Array.isArray(res.data) ? res.data : res.data.data;
        setPacientes(lista || [])
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarPacientes()
  }, [])

  const pacientesFiltrados = pacientes.filter(p => {
    const coincideNombre = `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) || p.email.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtroEstado === 'Todos' || p.estado === filtroEstado
    return coincideNombre && coincideEstado
  })

  if (cargando) {
    return <div className="text-center py-20 text-gray-300 text-lg">⏳ Cargando pacientes...</div>
  }

  if (error) {
    return (
      <div className="text-center py-20 text-rose-400 space-y-4">
        <p>Hubo un error al cargar la lista de pacientes.</p>
        <button 
          onClick={cargarPacientes}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-100">Lista de Pacientes</h1>

      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Buscar y Filtrar</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)} 
            placeholder="Buscar por nombre o email..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
          />
          <select 
            value={filtroEstado} 
            onChange={(e) => setFiltroEstado(e.target.value as FiltroEstado)}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="Todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="en_espera">En Espera</option>
          </select>
          <button 
            onClick={() => { setBusqueda(''); setFiltroEstado('Todos'); }}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-gray-100 transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
        <p className="text-sm text-gray-300">{pacientesFiltrados.length} paciente(s) registrado(s)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pacientesFiltrados.map(paciente => (
          <div key={paciente.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col justify-between">
            <PacienteCard paciente={paciente} />
            <Link
              to={`/pacientes/${paciente.id}`}
              className="mt-4 block text-center text-emerald-400 hover:text-emerald-300 text-sm font-medium"
            >
              Ver detalle →
            </Link>
          </div>
        ))}
      </div>

      {pacientesFiltrados.length === 0 && <p className="text-center text-gray-400 py-8">No se encontraron pacientes</p>}
    </div>
  )
}