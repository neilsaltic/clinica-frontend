import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import citaSchema, { type CitaFormData } from '../schemas/CitasSchema'
import { useMedicos } from '../hooks/useMedicos'

export function NuevaCitaPage() {
  const { medicos, cargando } = useMedicos()
  const navigate = useNavigate()
  const [confirmacion, setConfirmacion] = useState<CitaFormData | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CitaFormData>({
    resolver: zodResolver(citaSchema),
    defaultValues: {
      pacienteNombre: '',
      medicoId: '',
      fecha: '',
      hora: '',
      motivo: '',
      urgencia: undefined
    }
  })

  const onSubmit = async (datos: CitaFormData) => {
    // Simulamos envío al servidor
    await new Promise(resolve => setTimeout(resolve, 1500))
    setConfirmacion(datos)
  }

  const agendarOtra = () => {
    setConfirmacion(null)
    reset()
  }

  const hoy = new Date().toISOString().split('T')[0]

  if (confirmacion) {
    return (
      <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl border border-emerald-600 shadow-lg">
        <div className="text-center mb-6">
          <span className="text-4xl">✅</span>
          <h2 className="text-2xl font-bold text-emerald-400 mt-2">¡Cita Agendada!</h2>
        </div>
        
        <div className="space-y-3 text-gray-200 mb-6">
          <p><strong>Paciente:</strong> {confirmacion.pacienteNombre}</p>
          <p><strong>Médico:</strong> {medicos.find(m => m.id === confirmacion.medicoId)?.nombre}</p>
          <p><strong>Fecha:</strong> {confirmacion.fecha}</p>
          <p><strong>Hora:</strong> {confirmacion.hora}</p>
          <p><strong>Motivo:</strong> {confirmacion.motivo}</p>
          <p><strong>Urgencia:</strong> <span className="capitalize">{confirmacion.urgencia}</span></p>
        </div>

        <button
          onClick={agendarOtra}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          + Agendar otra cita
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
      <h1 className="text-2xl font-bold text-gray-100 mb-6 text-center">Agendar Nueva Cita</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Paciente */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nombre del Paciente</label>
          <input
            type="text"
            {...register('pacienteNombre')}
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
              errors.pacienteNombre ? 'border-rose-500' : 'border-gray-600'
            }`}
            placeholder="Nombre completo"
          />
          {errors.pacienteNombre && (
            <p className="text-rose-400 text-sm mt-1">{errors.pacienteNombre.message}</p>
          )}
        </div>

        {/* Médico */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Médico Asignado</label>
          <select
            {...register('medicoId')}
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
              errors.medicoId ? 'border-rose-500' : 'border-gray-600'
            }`}
            disabled={cargando}
          >
            <option value="">
              {cargando ? 'Cargando médicos...' : 'Selecciona un médico'}
            </option>
            {medicos.map(m => (
              <option key={m.id} value={m.id}>{m.nombre} — {m.especialidad}</option>
            ))}
          </select>
          {errors.medicoId && (
            <p className="text-rose-400 text-sm mt-1">{errors.medicoId.message}</p>
          )}
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Fecha</label>
          <input
            type="date"
            {...register('fecha')}
            min={hoy}
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
              errors.fecha ? 'border-rose-500' : 'border-gray-600'
            }`}
          />
          {errors.fecha && (
            <p className="text-rose-400 text-sm mt-1">{errors.fecha.message}</p>
          )}
        </div>

        {/* Hora */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Hora</label>
          <input
            type="time"
            {...register('hora')}
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
              errors.hora ? 'border-rose-500' : 'border-gray-600'
            }`}
          />
          {errors.hora && (
            <p className="text-rose-400 text-sm mt-1">{errors.hora.message}</p>
          )}
        </div>

        {/* Motivo */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Motivo de la Consulta</label>
          <textarea
            {...register('motivo')}
            rows={4}
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors resize-none ${
              errors.motivo ? 'border-rose-500' : 'border-gray-600'
            }`}
            placeholder="Describe el motivo de la consulta..."
          />
          {errors.motivo && (
            <p className="text-rose-400 text-sm mt-1">{errors.motivo.message}</p>
          )}
        </div>

        {/* Urgencia */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Nivel de Urgencia</label>
          <select
            {...register('urgencia')}
            className={`w-full px-4 py-2.5 rounded-lg bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors ${
              errors.urgencia ? 'border-rose-500' : 'border-gray-600'
            }`}
          >
            <option value="">Selecciona nivel</option>
            <option value="baja">Baja</option>
            <option value="media">Media</option>
            <option value="alta">Alta</option>
            <option value="critica">Crítica</option>
          </select>
          {errors.urgencia && (
            <p className="text-rose-400 text-sm mt-1">{errors.urgencia.message}</p>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            {isSubmitting ? '⏳ Agendando...' : '✅ Agendar Cita'}
          </button>
        </div>
      </form>
    </div>
  )
}