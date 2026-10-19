// Problemas encontrados en el código generado por la IA:
// 1. Mezclaba toda la lógica y el marcado en un solo archivo gigante
// 2. Los datos de ejemplo estaban escritos directamente en el JSX
// 3. No respetaba los tipos definidos para EstadoPaciente
import { useState, type ChangeEvent } from 'react'
import { Link } from 'react-router-dom' // ✅ Agregado
import type { Paciente, EstadoPaciente } from '../types/paciente'
import { PacienteCard } from '../component/PacienteCard'

const pacientesIniciales: Paciente[] = [
  { id: 'p1', nombre: 'María', apellido: 'González', email: 'maria.g@clinicasalud.com', telefono: '+591 777 12345', especialidadAsignada: 'Medicina General', ultimaCita: '2026-10-10', estado: 'activo' },
  { id: 'p2', nombre: 'Juan', apellido: 'Pérez', email: 'juan.p@clinicasalud.com', telefono: '+591 777 67890', especialidadAsignada: 'Cardiología', ultimaCita: '2026-10-08', estado: 'en_espera' },
  { id: 'p3', nombre: 'Ana', apellido: 'Rodríguez', email: 'ana.r@clinicasalud.com', telefono: '+591 777 54321', especialidadAsignada: 'Dermatología', ultimaCita: '2026-09-15', estado: 'inactivo' },
  { id: 'p4', nombre: 'Carlos', apellido: 'Mendoza', email: 'carlos.m@clinicasalud.com', telefono: '+591 777 98765', especialidadAsignada: 'Traumatología', ultimaCita: '2026-10-12', estado: 'activo' },
  { id: 'p5', nombre: 'Sofía', apellido: 'Vásquez', email: 'sofia.v@clinicasalud.com', telefono: '+591 777 45678', especialidadAsignada: 'Pediatría', ultimaCita: '2026-10-05', estado: 'en_espera' }
]

type FiltroEstado = EstadoPaciente | 'Todos'

export function PacientesPage() {
  const [pacientes, setPacientes] = useState<Paciente[]>(pacientesIniciales)
  const [busqueda, setBusqueda] = useState('')
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('Todos')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [estadoNuevo, setEstadoNuevo] = useState<EstadoPaciente>('activo')
  const [error, setError] = useState('')

  const pacientesFiltrados = pacientes.filter(p => {
    const coincideNombre = `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) || p.email.toLowerCase().includes(busqueda.toLowerCase())
    const coincideEstado = filtroEstado === 'Todos' || p.estado === filtroEstado
    return coincideNombre && coincideEstado
  })

  const handleBusqueda = (e: ChangeEvent<HTMLInputElement>) => setBusqueda(e.target.value)
  const handleFiltroEstado = (e: ChangeEvent<HTMLSelectElement>) => setFiltroEstado(e.target.value as FiltroEstado)
  const limpiarFiltros = () => { setBusqueda(''); setFiltroEstado('Todos') }

  const handleAgregar = () => {
    setError('')
    if (!nombre.trim() || !email.trim()) { setError('Nombre y email son obligatorios'); return }
    const nuevoPaciente: Paciente = {
      id: `p${Date.now()}`,
      nombre: nombre.trim(), apellido: apellido.trim(), email: email.trim(),
      telefono: '', especialidadAsignada: 'Sin asignar',
      ultimaCita: new Date().toISOString().split('T')[0], estado: estadoNuevo
    }
    setPacientes(prev => [...prev, nuevoPaciente])
    setNombre(''); setApellido(''); setEmail(''); setEstadoNuevo('activo')
  }

  const handleCambiarEstado = (id: string, nuevoEstado: EstadoPaciente) => {
    setPacientes(prev => prev.map(p => p.id === id ? { ...p, estado: nuevoEstado } : p))
  }

  const handleEliminar = (id: string) => {
    if (window.confirm('¿Seguro que quieres eliminar este paciente?')) {
      setPacientes(prev => prev.filter(p => p.id !== id))
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-100">Lista de Pacientes</h1>

      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Buscar y Filtrar</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input type="text" value={busqueda} onChange={handleBusqueda} placeholder="Buscar por nombre o email..."
            className="flex-1 px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <select value={filtroEstado} onChange={handleFiltroEstado}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="Todos">Todos</option>
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="en_espera">En Espera</option>
          </select>
          <button onClick={limpiarFiltros}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-gray-100 transition-colors">Limpiar Filtros</button>
        </div>
        <p className="text-sm text-gray-400">{pacientesFiltrados.length} paciente(s) encontrado(s)</p>
      </div>

      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Agregar Nuevo Paciente</h2>
        {error && <p className="text-rose-400 text-sm">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre *"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email *"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <select value={estadoNuevo} onChange={(e) => setEstadoNuevo(e.target.value as EstadoPaciente)}
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
            <option value="en_espera">En Espera</option>
          </select>
        </div>
        <button onClick={handleAgregar}
          className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors">+ Agregar Paciente</button>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pacientesFiltrados.map(paciente => (
          <div key={paciente.id}>
            <PacienteCard paciente={paciente} />
            <div className="mt-3 flex items-center justify-between gap-2 px-2">
              <select value={paciente.estado}
                onChange={(e) => handleCambiarEstado(paciente.id, e.target.value as EstadoPaciente)}
                className="text-sm px-2 py-1 rounded bg-gray-700 border border-gray-600 text-gray-200">
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
                <option value="en_espera">En Espera</option>
              </select>
              <button onClick={() => handleEliminar(paciente.id)}
                className="text-sm px-3 py-1 rounded bg-rose-900/50 text-rose-300 hover:bg-rose-800 transition-colors">Eliminar</button>
            </div>
            {/* ✅ Enlace agregado — va al detalle del paciente */}
            <Link
              to={`/pacientes/${paciente.id}`}
              className="mt-2 block text-center text-emerald-400 hover:text-emerald-300 text-sm font-medium"
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