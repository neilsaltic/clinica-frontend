import { useEffect } from "react";
import { usePacientesStore } from "../stores/paciente.stores";

export function usePacientes() {
  const pacientes = usePacientesStore((s) => s.pacientes);
  const cargando = usePacientesStore((s) => s.cargando);
  const error = usePacientesStore((s) => s.error);
  const cargar = usePacientesStore((s) => s.cargar);
  const crear = usePacientesStore((s) => s.crear);
  const actualizar = usePacientesStore((s) => s.actualizar);
  const eliminar = usePacientesStore((s) => s.eliminar);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return {
    pacientes,
    cargando,
    error,
    crear,
    actualizar,
    eliminar,
  };
}
