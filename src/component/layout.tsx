import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import toast from 'react-hot-toast'

export function Layout() {
  const linkActivo = 'bg-emerald-600 text-white font-medium'
  const linkInactivo = 'bg-gray-800 text-gray-300 hover:bg-gray-700'

  // Datos de autenticación
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const usuario = useAuthStore((s) => s.usuario)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Sesión cerrada correctamente')
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar fijo a la izquierda */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4 flex-shrink-0 hidden md:block">
        <h2 className="text-xl font-bold text-emerald-400 mb-8">Clínica Salud Integral</h2>
        <nav className="space-y-3">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg transition-colors ${isActive ? linkActivo : linkInactivo}`
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/pacientes"
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg transition-colors ${isActive ? linkActivo : linkInactivo}`
            }
          >
            👥 Pacientes
          </NavLink>
          <NavLink
            to="/citas/nueva"
            className={({ isActive }) =>
              `block px-4 py-2.5 rounded-lg transition-colors ${isActive ? linkActivo : linkInactivo}`
            }
          >
            📅 Nueva Cita
          </NavLink>
        </nav>
      </aside>

      {/* Contenedor derecho (Header superior + Contenido principal) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-auto">
        {/* Header Superior con control de sesión */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-3.5 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Panel Médico</span>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300 hidden sm:inline">
                  Usuario: <strong className="text-emerald-400">{usuario?.usuario}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-medium transition-colors shadow"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium transition-colors shadow"
              >
                Iniciar Sesión
              </NavLink>
            )}
          </div>
        </header>

        {/* Contenido principal — aquí se carga cada página */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}