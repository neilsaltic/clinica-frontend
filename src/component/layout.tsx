import { Outlet, NavLink } from 'react-router-dom'

export function Layout() {
  const linkActivo = 'bg-emerald-600 text-white font-medium'
  const linkInactivo = 'bg-gray-800 text-gray-300 hover:bg-gray-700'

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

      {/* Contenido principal — aquí se carga cada página */}
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}