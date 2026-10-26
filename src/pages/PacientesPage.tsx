import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PacienteCard } from '../component/PacienteCard'
import { usePacientesStore } from '../stores/paciente.stores'
import { useFiltrosStore } from '../stores/filltrosStore'
import type { EstadoPaciente } from '../types/paciente'
import toast from 'react-hot-toast'

export function PacientesPage() {
  // Selectores de Zustand (Evita desestructurar todo el store de un golpe)
  const pacientes = usePacientesStore(s => s.pacientes)
  const cargando = usePacientesStore(s => s.cargando)
  const error = usePacientesStore(s => s.error)
  const cargar = usePacientesStore(s => s.cargar)
  const crear = usePacientesStore(s => s.crear)
  const eliminar = usePacientesStore(s => s.eliminar)

  // Filtros globales desde su store
  const queryPacientes = useFiltrosStore(s => s.queryPacientes)
  const setQueryPacientes = useFiltrosStore(s => s.setQueryPacientes)

  // UI local (modales, inputs de formulario)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [estadoNuevo, setEstadoNuevo] = useState<EstadoPaciente>('activo')
  const [errorForm, setErrorForm] = useState('')

  const [modalAbierto, setModalAbierto] = useState(false)
  const [pacienteAEliminar, setPacienteAEliminar] = useState<string | number | null>(null)
  const [eliminando, setEliminando] = useState(false)

  useEffect(() => {
    cargar()
  }, [cargar])

  const handleAgregar = async () => {
    setErrorForm('')
    if (!nombre.trim() || !email.trim()) { 
      setErrorForm('Nombre y email son obligatorios') 
      return 
    }
    
    try {
      await crear({
        nombre: nombre.trim(), 
        apellido: apellido.trim(), 
        email: email.trim(),
        telefono: '', 
        especialidadAsignada: 'Sin asignar',
        ultimaCita: new Date().toISOString().split('T')[0], 
        estado: estadoNuevo
      })
      toast.success('Paciente registrado')
      setNombre(''); setApellido(''); setEmail(''); setEstadoNuevo('activo')
    } catch {
      toast.error('No se pudo registrar el paciente')
    }
  }

  const confirmarEliminacion = async () => {
    if (!pacienteAEliminar) return
    setEliminando(true)
    try {
      await eliminar(pacienteAEliminar)
      toast.success('Paciente eliminado')
      setModalAbierto(false)
      setPacienteAEliminar(null)
    } catch {
      toast.error('No se pudo eliminar el paciente')
    } finally {
      setEliminando(false)
    }
  }

  const pacientesFiltrados = pacientes.filter(p => {
    const coincideNombre = `${p.nombre} ${p.apellido}`.toLowerCase().includes(queryPacientes.toLowerCase()) || p.email.toLowerCase().includes(queryPacientes.toLowerCase())
    return coincideNombre
  })

  if (cargando && pacientes.length === 0) {
    return <div className="text-center py-20 text-gray-300 text-lg">⏳ Cargando pacientes...</div>
  }

  if (error) {
    return (
      <div className="text-center py-20 text-rose-400 space-y-4">
        <p>Hubo un error: {error}</p>
        <button 
          onClick={() => cargar()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
        >
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 relative">
      <h1 className="text-2xl font-bold text-gray-100">Lista de Pacientes (Zustand)</h1>

      {/* Formulario Agregar */}
      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Agregar Nuevo Paciente</h2>
        {errorForm && <p className="text-rose-400 text-sm">{errorForm}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Nombre *"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100" 
          />
          <input 
            type="text" 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)} 
            placeholder="Apellido"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100" 
          />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email *"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100" 
          />
          <select 
            value={estadoNuevo} 
            onChange={(e) => setEstadoNuevo(e.target.value as EstadoPaciente)}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="en_espera">En Espera</option>
          </select>
        </div>
        <button 
          onClick={handleAgregar}
          className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
        >
          + Agregar Paciente
        </button>
      </div>

      {/* Barra de búsqueda usando useFiltrosStore */}
      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Buscar</h2>
        <input 
          type="text" 
          value={queryPacientes} 
          onChange={(e) => setQueryPacientes(e.target.value)} 
          placeholder="Buscar por nombre o email..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100" 
        />
        <p className="text-sm text-gray-300">{pacientesFiltrados.length} paciente(s) registrado(s)</p>
      </div>

      {/* Listado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pacientesFiltrados.map(paciente => (
          <div key={paciente.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col justify-between">
            <PacienteCard paciente={paciente} />
            <div className="mt-4 pt-3 border-t border-gray-700 flex items-center justify-between">
              <Link to={`/pacientes/${paciente.id}`} className="text-emerald-400 text-sm font-medium">Ver detalle →</Link>
              <button
                onClick={() => { setPacienteAEliminar(paciente.id); setModalAbierto(true); }}
                className="px-3 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-300 text-sm rounded-lg"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Eliminación */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-100">Confirmar Eliminación</h3>
            <p className="text-gray-300">¿Estás seguro de eliminar este paciente?</p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalAbierto(false)}
                disabled={eliminando}
                className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                disabled={eliminando}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg"
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