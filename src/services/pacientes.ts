import { api } from "../libs/axios"; // o '../lib/axios' según tu ruta
import type { Paciente } from "../types/paciente";

export const create = (data: Omit<Paciente, "id">) =>
  api.post<Paciente>("/pacientes", data);

export const update = (
  id: number | string,
  data: Partial<Omit<Paciente, "id">>,
) => api.put<Paciente>(`/pacientes/${id}`, data);

export const remove = (id: number | string) => api.delete(`/pacientes/${id}`);
