import { Link } from 'react-router-dom';

export function PaginaSinAcceso() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <span className="text-6xl mb-4">🚫</span>
      <h1 className="text-3xl font-bold text-gray-100 mb-2">Acceso Denegado</h1>
      <p className="text-gray-400 max-w-md mb-6">
        No tienes los permisos necesarios (roles autorizados) para acceder a esta sección de la clínica.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors shadow"
      >
        ← Volver al inicio
      </Link>
    </div>
  );
}