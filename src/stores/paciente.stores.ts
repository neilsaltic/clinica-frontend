import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "../libs/axios"; // Ajusta según la ruta de tu axios
import { extraerMensajeError } from "../libs/errorHandler";
import type { Paciente } from "../types/paciente";

interface PacientesState {
  pacientes: Paciente[];
  cargando: boolean;
  error: string | null;
  cargar: (query?: string) => Promise<void>;
  crear: (data: Omit<Paciente, "id">) => Promise<void>;
  actualizar: (
    id: string | number,
    data: Partial<Omit<Paciente, "id">>,
  ) => Promise<void>;
  eliminar: (id: string | number) => Promise<void>;
}

export const usePacientesStore = create<PacientesState>()(
  devtools(
    (set, get) => ({
      pacientes: [],
      cargando: false,
      error: null,

      cargar: async (query) => {
        set({ cargando: true, error: null });
        try {
          const res = await api.get("/pacientes", { params: { query } });
          const lista = Array.isArray(res.data) ? res.data : res.data.data;
          set({ pacientes: lista || [], cargando: false });
        } catch (err) {
          set({ error: extraerMensajeError(err), cargando: false });
        }
      },

      crear: async (data) => {
        set({ cargando: true, error: null });
        try {
          const res = await api.post("/pacientes", data);
          set({ pacientes: [...get().pacientes, res.data], cargando: false });
        } catch (err) {
          set({ error: extraerMensajeError(err), cargando: false });
          throw err; // Para que el componente pueda atrapar el error si usa toasts
        }
      },

      actualizar: async (id, data) => {
        set({ cargando: true, error: null });
        try {
          const res = await api.put(`/pacientes/${id}`, data);
          set({
            pacientes: get().pacientes.map((p) => (p.id === id ? res.data : p)),
            cargando: false,
          });
        } catch (err) {
          set({ error: extraerMensajeError(err), cargando: false });
          throw err;
        }
      },

      eliminar: async (id) => {
        set({ cargando: true, error: null });
        try {
          await api.delete(`/pacientes/${id}`);
          set({
            pacientes: get().pacientes.filter((p) => p.id !== id),
            cargando: false,
          });
        } catch (err) {
          set({ error: extraerMensajeError(err), cargando: false });
          throw err;
        }
      },
    }),
    { name: "PacientesStore" },
  ),
);
