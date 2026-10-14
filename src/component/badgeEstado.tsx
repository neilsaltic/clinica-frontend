// Problemas encontrados generados por la IA 
//1.- no entiendo lo que me trae ya que todo esta en un solo archivo HTML
//2.- no viene por componentes o tipos asi que hay que organizarlo para saber donde esta todo 
//3.- creo que el problema soy yo y no asi la IA jaja pero trato de entetnder mas 

import type { EstadoPaciente } from "../types/paciente"

interface BadgeEstadoProps {
  estado: EstadoPaciente
}

const colorPorEstado: Record<EstadoPaciente, string> = {
  activo: 'bg-emerald-900 text-emerald-200',
  inactivo: 'bg-rose-900 text-rose-200',
  en_espera: 'bg-amber-900 text-amber-200',
}

const textoPorEstado: Record<EstadoPaciente, string> = {
  activo: 'Activo',
  inactivo: 'Inactivo',
  en_espera: 'En Espera',
}

export function BadgeEstado({ estado }: BadgeEstadoProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorPorEstado[estado]}`}>
      {textoPorEstado[estado]}
    </span>
  )
}