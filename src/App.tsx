import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './component/layout'
import { DashboardPage } from './pages/DshboardPage'
import { PacientesPage } from './pages/PacientesPage'
import { DetallePacientePage } from './pages/DetallePaciente'
import { NuevaCitaPage } from './pages/NuevaCitaPage'
import { LoginPage } from './pages/LoginPage' // 👈 Importa tu vista de login
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  const [enMantenimiento, setEnMantenimiento] = useState(false)

  return (
    <Routes>
      {/* Ruta pública del Login (fuera del Layout principal si prefieres pantalla completa) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas envueltas por el Layout principal */}
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
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App