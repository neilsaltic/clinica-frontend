import { useEffect, useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Paciente, EstadoPaciente } from '../types/paciente'
import { PacienteCard } from '../component/PacienteCard'
import { api } from '../libs/axios' // O '../lib/axios' según tu ruta
import { create, remove } from '../services/pacientes'
import { extraerMensajeError } from '../libs/errorHandler'
import toast from 'react-hot-toast'

type FiltroEstado = EstadoPaciente | 'Todos'

export function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('Todos')

  // Estados para el formulario de agregar paciente
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [estadoNuevo, setEstadoNuevo] = useState<EstadoPaciente>('activo')
  const [errorForm, setErrorForm] = useState('')

  // Estados para el Modal de Confirmación de Eliminación
  const [modalAbierto, setModalAbierto] = useState(false)
  const [pacienteAEliminar, setPacienteAEliminar] = useState<string | number | null>(null)
  const [eliminando, setEliminando] = useState(false)

  const cargarPacientes = () => {
    setCargando(true)
    setError(false)
    api.get('/pacientes')
      .then((res) => {
        const lista = Array.isArray(res.data) ? res.data : res.data.data;
        setPacientes(lista || [])
      })
      .catch(() => setError(true))
      .finally(() => setCargando(false))
  }

  useEffect(() => {
    cargarPacientes()
  }, [])

  // Función para crear un nuevo paciente (POST)
  const handleAgregar = async () => {
    setErrorForm('')
    if (!nombre.trim() || !email.trim()) { 
      setErrorForm('Nombre y email son obligatorios') 
      return 
    }
    
    try {
      const nuevoDatos = {
        nombre: nombre.trim(), 
        apellido: apellido.trim(), 
        email: email.trim(),
        telefono: '', 
        especialidadAsignada: 'Sin asignar',
        ultimaCita: new Date().toISOString().split('T')[0], 
        estado: estadoNuevo
      }

      const res = await create(nuevoDatos)
      setPacientes(prev => [...prev, res.data])
      toast.success('Paciente registrado')
      
      // Limpiar formulario
      setNombre(''); setApellido(''); setEmail(''); setEstadoNuevo('activo')
    } catch (err) {
      toast.error(extraerMensajeError(err))
    }
  }

  // Función para ejecutar la eliminación real (DELETE)
  const confirmarEliminacion = async () => {
    if (!pacienteAEliminar) return
    setEliminando(true)
    try {
      await remove(pacienteAEliminar as number)
      setPacientes(prev => prev.filter(p => p.id !== pacienteAEliminar))
      toast.success('Paciente eliminado')
      setModalAbierto(false)
      setPacienteAEliminar(null)
    } catch (err) {
      toast.error(extraerMensajeError(err))
    } finally {
      setEliminando(false)
    }
  }

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
    <div className="space-y-8 relative">
      <h1 className="text-2xl font-bold text-gray-100">Lista de Pacientes</h1>

      {/* SECCIÓN: Formulario para Agregar Paciente */}
      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Agregar Nuevo Paciente</h2>
        {errorForm && <p className="text-rose-400 text-sm">{errorForm}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Nombre *"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
          />
          <input 
            type="text" 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)} 
            placeholder="Apellido"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
          />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email *"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" 
          />
          <select 
            value={estadoNuevo} 
            onChange={(e) => setEstadoNuevo(e.target.value as EstadoPaciente)}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="en_espera">En Espera</option>
          </select>
        </div>
        <button 
          onClick={handleAgregar}
          className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
        >
          + Agregar Paciente
        </button>
      </div>

      {/* SECCIÓN: Buscar y Filtrar */}
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

      {/* GRID DE PACIENTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pacientesFiltrados.map(paciente => (
          <div key={paciente.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col justify-between">
            <div>
              <PacienteCard paciente={paciente} />
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-700 flex items-center justify-between">
              <Link
                to={`/pacientes/${paciente.id}`}
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
              >
                Ver detalle →
              </Link>
              <button
                onClick={() => {
                  setPacienteAEliminar(paciente.id)
                  setModalAbierto(true)
                }}
                className="px-3 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-300 text-sm rounded-lg transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {pacientesFiltrados.length === 0 && <p className="text-center text-gray-400 py-8">No se encontraron pacientes</p>}

      {/* MODAL DE CONFIRMACIÓN PARA ELIMINAR */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-100">Confirmar Eliminación</h3>
            <p className="text-gray-300">¿Estás seguro de que deseas eliminar este paciente del sistema? Esta acción no se puede deshacer.</p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => { setModalAbierto(false); setPacienteAEliminar(null); }}
                disabled={eliminando}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                disabled={eliminando}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white rounded-lg font-medium transition-colors"
              >
                {eliminando ? 'Eliminando...' : 'Sí, eliminar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}