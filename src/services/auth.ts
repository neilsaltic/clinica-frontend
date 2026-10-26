import { api } from "../libs/axios"; // Ajusta la ruta a tu instancia de axios si es necesario
import type { LoginFormData } from "../schemas/loginSchema";

export interface LoginResponse {
  token: string;
  usuario: {
    id: number;
    usuario: string;
    rol: string;
  };
}

export async function login(datos: LoginFormData): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", datos);
  return data;
}
