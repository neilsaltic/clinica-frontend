import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore'; // Ajusta la ruta a tu store

interface RutaProtegidaProps {
  rolesPermitidos?: string[];
}

export function RutaProtegida({ rolesPermitidos }: RutaProtegidaProps) {
  // Ajusta según los nombres de tu store actual (isAuthenticated, usuario)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const usuario = useAuthStore((s) => s.usuario);

  // 1. Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si se piden roles específicos y el usuario no los tiene, redirige a la página de sin acceso
  if (rolesPermitidos && usuario) {
    const rolUsuario = usuario.rol.toUpperCase();
    const tienePermiso = rolesPermitidos.some((rol) => rol.toUpperCase() === rolUsuario);

    if (!tienePermiso) {
      return <Navigate to="/sin-acceso" replace />;
    }
  }

  // 3. Si pasa todas las validaciones, renderiza las rutas hijas
  return <Outlet />;
}