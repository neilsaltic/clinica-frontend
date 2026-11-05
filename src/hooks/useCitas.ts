// src/features/citas/hooks/useCitas.ts
import { useEffect } from "react";
import { useCitasStore } from "../stores/citasStore"; // Ajusta la ruta exacta a tu store de citas

export function useCitas(pacienteId?: string | number) {
  const citas = useCitasStore((s) => s.citas);
  const citaSeleccionada = useCitasStore((s) => s.citaSeleccionada);
  const cargando = useCitasStore((s) => s.cargando);
  const error = useCitasStore((s) => s.error);
  const cargarPorPaciente = useCitasStore((s) => s.cargarPorPaciente);
  const seleccionar = useCitasStore((s) => s.seleccionar);
  const actualizarEstado = useCitasStore((s) => s.actualizarEstado);
  const agregarCita = useCitasStore((s) => s.agregarCita);

  useEffect(() => {
    // Si la vista requiere filtrar o cargar por paciente al montar, lo ejecutamos
    if (pacienteId) {
      cargarPorPaciente(pacienteId);
    }
  }, [pacienteId, cargarPorPaciente]);

  return {
    citas,
    citaSeleccionada,
    cargando,
    error,
    cargarPorPaciente,
    seleccionar,
    actualizarEstado,
    agregarCita,
  };
}
