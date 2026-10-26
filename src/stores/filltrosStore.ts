import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FiltrosState {
  queryPacientes: string;
  especialidadFiltro: string;
  estadoCitaFiltro: string; // 'Todos' o el estado correspondiente
  setQueryPacientes: (query: string) => void;
  setEspecialidad: (especialidad: string) => void;
  setEstadoCita: (estado: string) => void;
  resetFiltros: () => void;
}

export const useFiltrosStore = create<FiltrosState>()(
  devtools(
    (set) => ({
      queryPacientes: "",
      especialidadFiltro: "Todos",
      estadoCitaFiltro: "Todos",
      setQueryPacientes: (query) => set({ queryPacientes: query }),
      setEspecialidad: (esp) => set({ especialidadFiltro: esp }),
      setEstadoCita: (estado) => set({ estadoCitaFiltro: estado }),
      resetFiltros: () =>
        set({
          queryPacientes: "",
          especialidadFiltro: "Todos",
          estadoCitaFiltro: "Todos",
        }),
    }),
    { name: "FiltrosStore" },
  ),
);
