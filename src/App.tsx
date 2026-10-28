import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './component/layout'
import { DashboardPage } from './pages/DshboardPage'
import { PacientesPage } from './pages/PacientesPage'
import { DetallePacientePage } from './pages/DetallePaciente'
import { NuevaCitaPage } from './pages/NuevaCitaPage'
import { LoginPage } from './pages/LoginPage'
import { PaginaSinAcceso } from './pages/PaginaSinAcceso' 
import { NotFoundPage } from './pages/NotFoundPage'
import { RutaProtegida } from './component/rutaprotegida' 

function App() {
  const [enMantenimiento, setEnMantenimiento] = useState(false)

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas globales */}
      <Route element={<RutaProtegida />}>
        <Route element={<Layout />}>
          <Route 
            path="/" 
            element={
              <DashboardPage 
                enMantenimiento={enMantenimiento}
                onToggleMantenimiento={() => setEnMantenimiento(prev => !prev)}
              />
            } 
          />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/pacientes/:id" element={<DetallePacientePage />} />
          <Route path="/citas/nueva" element={<NuevaCitaPage />} />
          <Route path="/sin-acceso" element={<PaginaSinAcceso />} />

          {/* Ejemplo de ruta exclusiva para GERENCIA o ADMIN */}
          <Route element={<RutaProtegida rolesPermitidos={['GERENCIA', 'ADMIN']} />}>
            {/* <Route path="/reportes" element={<PaginaReportes />} /> */}
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App