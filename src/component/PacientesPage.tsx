// Problemas encontrados en el código generado por la IA:
// 1. Mezclaba toda la lógica y el marcado en un solo archivo gigante
// 2. Los datos de ejemplo estaban escritos directamente dentro del JSX (hardcodeados)
// 3. No respetaba los tipos definidos: usaba cualquier texto para el estado en lugar del tipo EstadoPaciente
// 4. No tenía diseño responsivo: se rompía en pantallas pequeñas

import { useState } from 'react'
import type { Paciente } from '../types/paciente'
import { PacienteCard } from './PacienteCard'
import { BuscadorPacientes } from './BuscadorPaciente'

// 5 pacientes de ejemplo como constante fuera del componente
const pacientesEjemplo: Paciente[] = [
  {
    id: 'p1',
    nombre: 'María',
    apellido: 'González',
    email: 'maria.g@clinicasalud.com',
    telefono: '+591 777 12345',
    especialidadAsignada: 'Medicina General',
    ultimaCita: '2026-10-10',
    estado: 'activo'
  },
  {
    id: 'p2',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.p@clinicasalud.com',
    telefono: '+591 777 67890',
    especialidadAsignada: 'Cardiología',
    ultimaCita: '2026-10-08',
    estado: 'en_espera'
  },
  {
    id: 'p3',
    nombre: 'Ana',
    apellido: 'Rodríguez',
    email: 'ana.r@clinicasalud.com',
    telefono: '+591 777 54321',
    especialidadAsignada: 'Dermatología',
    ultimaCita: '2026-09-15',
    estado: 'inactivo'
  },
  {
    id: 'p4',
    nombre: 'Carlos',
    apellido: 'Mendoza',
    email: 'carlos.m@clinicasalud.com',
    telefono: '+591 777 98765',
    especialidadAsignada: 'Traumatología',
    ultimaCita: '2026-10-12',
    estado: 'activo'
  },
  {
    id: 'p5',
    nombre: 'Sofía',
    apellido: 'Vásquez',
    email: 'sofia.v@clinicasalud.com',
    telefono: '+591 777 45678',
    especialidadAsignada: 'Pediatría',
    ultimaCita: '2026-10-05',
    estado: 'en_espera'
  }
]

export function PaginaPacientes() {
  const [busqueda, setBusqueda] = useState('')

  const pacientesFiltrados = pacientesEjemplo.filter((p) =>
    `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.email.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Lista de Pacientes</h1>
        
        <BuscadorPacientes value={busqueda} onChange={setBusqueda} />
        
        {/* Diseño responsivo: 1 columna en móvil, 3 en escritorio */}
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pacientesFiltrados.map((paciente) => (
            <PacienteCard key={paciente.id} paciente={paciente} />
          ))}
        </div>

        {pacientesFiltrados.length === 0 && (
          <p className="text-center text-gray-400 mt-8">No se encontraron pacientes</p>
        )}
      </div>
    </div>
  )
}