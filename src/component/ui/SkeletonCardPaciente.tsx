export function PacienteCardSkeleton() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg space-y-4 animate-pulse">
      {/* Cabecera simulada con avatar y nombre */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-700" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-700 rounded w-1/2" />
        </div>
      </div>

      {/* Líneas de datos simuladas (email, teléfono, estado) */}
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-gray-700 rounded w-full" />
        <div className="h-3 bg-gray-700 rounded w-5/6" />
        <div className="h-3 bg-gray-700 rounded w-2/3" />
      </div>

      {/* Botones de acción simulados */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700/60">
        <div className="h-8 bg-gray-700 rounded w-24" />
        <div className="h-8 bg-gray-700 rounded w-20" />
      </div>
    </div>
  );
}
