import type { Paciente } from "../types/paciente";

interface PacienteCardProps {
  paciente: Paciente;
}

export function PacienteCard({ paciente }: PacienteCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 hover:border-gray-600 transition-colors shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-100">
          {paciente.nombre} {paciente.apellido}
        </h3>
        {/* Si tu tipo no tiene estado estricto, puedes omitirlo o asegurarte de pasarlo */}
      </div>

      <div className="space-y-2 text-sm text-gray-300">
        <p className="flex items-center gap-2">📧 {paciente.email}</p>
        <p className="flex items-center gap-2">
          📅 Nacimiento: {paciente.fechaNacimiento || "No registrada"}
        </p>
      </div>
    </div>
  );
}
