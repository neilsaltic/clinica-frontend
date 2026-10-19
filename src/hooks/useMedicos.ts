import { useState, useEffect } from "react";
import type { Medico } from "../types/medico";

const medicosSimulados: Medico[] = [
  { id: "m1", nombre: "Dr. Roberto Calle", especialidad: "Medicina General" },
  { id: "m2", nombre: "Dra. Mariana Quispe", especialidad: "Cardiología" },
  { id: "m3", nombre: "Dr. Luis Mendoza", especialidad: "Dermatología" },
  { id: "m4", nombre: "Dra. Sofía Vásquez", especialidad: "Pediatría" },
  { id: "m5", nombre: "Dr. Carlos Rojas", especialidad: "Traumatología" },
];

export function useMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMedicos(medicosSimulados);
      setCargando(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { medicos, cargando };
}
