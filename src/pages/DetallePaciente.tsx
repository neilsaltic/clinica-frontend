import { useParams, useNavigate, Link } from "react-router-dom";
import type { Paciente } from "../types/paciente";
import { NotFoundPage } from "./NotFoundPage";

// Datos mock limpios que coinciden exactamente con la interfaz Paciente
const PACIENTES_INICIALES: Paciente[] = [
  {
    id: "p1",
    nombre: "María",
    apellido: "González",
    email: "maria.g@clinicasalud.com",
    fechaNacimiento: "1990-05-12",
  },
  {
    id: "p2",
    nombre: "Juan",
    apellido: "Pérez",
    email: "juan.p@clinicasalud.com",
    fechaNacimiento: "1985-08-20",
  },
  {
    id: "p3",
    nombre: "Ana",
    apellido: "Rodríguez",
    email: "ana.r@clinicasalud.com",
    fechaNacimiento: "1992-03-15",
  },
  {
    id: "p4",
    nombre: "Carlos",
    apellido: "Mendoza",
    email: "carlos.m@clinicasalud.com",
    fechaNacimiento: "1998-11-30",
  },
  {
    id: "p5",
    nombre: "Sofía",
    apellido: "Vásquez",
    email: "sofia.v@clinicasalud.com",
    fechaNacimiento: "1995-07-22",
  },
];

export function DetallePacientePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const paciente = PACIENTES_INICIALES.find((p) => String(p.id) === String(id));

  if (!paciente) {
    return <NotFoundPage />;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
      >
        ← Volver
      </button>

      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-lg">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold text-gray-100">
            {paciente.nombre} {paciente.apellido}
          </h1>
        </div>

        <div className="space-y-4 text-lg text-gray-300">
          <p>
            <strong className="text-gray-100">📧 Email:</strong>{" "}
            {paciente.email}
          </p>
          <p>
            <strong className="text-gray-100">📅 Fecha de Nacimiento:</strong>{" "}
            {paciente.fechaNacimiento || "No registrada"}
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link
            to="/citas/nueva"
            className="flex-1 text-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
          >
            📅 Agendar Cita
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
