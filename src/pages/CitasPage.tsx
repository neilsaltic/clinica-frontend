import { useCitas } from "../hooks/useCitas";

export function CitasPage() {
  const { citas, cargando, error, actualizarEstado } = useCitas();

  if (cargando) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-100">Gestión de Citas</h1>
        <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 text-center text-gray-400 animate-pulse">
          ⏳ Cargando todas las citas...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-rose-400">
        <p>Hubo un error al cargar las citas: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-100">Listado de Citas</h1>
          <p className="text-gray-400 text-sm mt-1">
            Control general de citas médicas agendadas
          </p>
        </div>
      </div>

      {citas.length === 0 ? (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center text-gray-400">
          No hay citas registradas en el sistema.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {citas.map((cita) => (
            <div
              key={cita.id}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                    {cita.estado}
                  </span>
                  <span className="text-xs text-gray-400">ID: {cita.id}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-100">
                  📅 {cita.fechaHora.replace("T", " ")}
                </h3>
                <p className="text-sm text-gray-300">
                  <strong>Motivo:</strong> {cita.motivo || "Sin especificar"}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-700/60 flex gap-2">
                {cita.estado !== "COMPLETADA" && (
                  <button
                    onClick={() => actualizarEstado(cita.id, "COMPLETADA")}
                    className="flex-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs rounded-lg font-medium transition-colors"
                  >
                    Completar
                  </button>
                )}
                {cita.estado !== "CANCELADA" && (
                  <button
                    onClick={() => actualizarEstado(cita.id, "CANCELADA")}
                    className="flex-1 px-3 py-1.5 bg-rose-900/60 hover:bg-rose-800 text-rose-300 text-xs rounded-lg font-medium transition-colors"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
