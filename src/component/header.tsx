import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useFiltrosStore } from '../stores/filltrosStore'; // Opcional si usas el store de filtros para el buscador global
import toast from 'react-hot-toast';

export function Header() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const usuario = useAuthStore((s) => s.usuario);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  // Si ya creaste el store de filtros, puedes conectar el buscador aquí directamente
  const queryPacientes = useFiltrosStore((s) => s.queryPacientes);
  const setQueryPacientes = useFiltrosStore((s) => s.setQueryPacientes);

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada correctamente');
    navigate('/login', { replace: true });
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
      {/* Logo y Nombre de la Clínica */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:bg-emerald-500 transition-colors">
          🏥
        </div>
        <div>
          <span className="text-xl font-bold text-gray-100 block">Salud Integral</span>
          <span className="text-xs text-emerald-400 font-medium">Clínica Médica</span>
        </div>
      </Link>

      {/* Buscador Global Opcional */}
      <div className="w-full sm:w-72">
        <input
          type="text"
          value={queryPacientes || ''}
          onChange={(e) => setQueryPacientes(e.target.value)}
          placeholder="🔍 Buscar pacientes..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
        />
      </div>

      {/* Sección de Usuario y Botón de Sesión */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300 hidden md:inline">
              Hola, <strong className="text-gray-100">{usuario?.usuario}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition-colors shadow"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shadow"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  );
}