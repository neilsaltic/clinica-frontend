import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from './component/layout'
import { DashboardPage } from './pages/DshboardPage'
import { PacientesPage } from './pages/PacientesPage'
import { DetallePacientePage } from './pages/DetallePaciente'
import { NuevaCitaPage } from './pages/NuevaCitaPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
  // ✅ El estado va AQUÍ, no dentro de cada página
  const [enMantenimiento, setEnMantenimiento] = useState(false)

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* ✅ Mandamos las props correctamente */}
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