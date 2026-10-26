import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { api } from "../libs/axios";
import { extraerMensajeError } from "../libs/errorHandler";

// Ajusta o importa tu tipo Cita según corresponda
export interface Cita {
  id: string | number;
  fechaHora: string;
  estado: "PROGRAMADA" | "COMPLETADA" | "CANCELADA" | string;
  motivo?: string;
  pacienteId: number;
  medicoId: number;
}

interface CitasState {
  citas: Cita[];
  citaSeleccionada: Cita | null;
  cargando: boolean;
  error: string | null;
  cargarPorPaciente: (id: string | number) => Promise<void>;
  seleccionar: (id: string | number) => void;
  actualizarEstado: (id: string | number, estado: string) => Promise<void>;
  agregarCita: (data: Omit<Cita, "id">) => Promise<void>;
}

export const useCitasStore = create<CitasState>()(
  devtools(
    (set, get) => ({
      citas: [],
      citaSeleccionada: null,
      cargando: false,
      error: null,

      cargarPorPaciente: async (id) => {
        set({ cargando: true, error: null });
        try {
          const res = await api.get(`/citas?pacienteId=${id}`);
          const lista = Array.isArray(res.data) ? res.data : res.data.data;
          set({ citas: lista || [], cargando: false });
        } catch (err) {
          set({ error: extraerMensajeError(err), cargando: false });
        }
      },

      seleccionar: (id) => {
        const encontrada = get().citas.find((c) => c.id === id) || null;
        set({ citaSeleccionada: encontrada });
      },

      actualizarEstado: async (id, estado) => {
        try {
          const res = await api.put(`/citas/${id}`, { estado });
          set({
            citas: get().citas.map((c) => (c.id === id ? res.data : c)),
          });
        } catch (err) {
          set({ error: extraerMensajeError(err) });
          throw err;
        }
      },

      agregarCita: async (data) => {
        try {
          const res = await api.post("/citas", data);
          set({ citas: [...get().citas, res.data] });
        } catch (err) {
          set({ error: extraerMensajeError(err) });
          throw err;
        }
      },
    }),
    { name: "CitasStore" },
  ),
);
