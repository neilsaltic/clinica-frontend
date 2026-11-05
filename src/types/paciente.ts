export type EstadoPaciente = "activo" | "inactivo" | "en_espera";

export interface Paciente {
  id: number | string;
  nombre: string;
  apellido: string;
  email: string;
  fechaNacimiento?: string; // 👈 Añade esta línea
}
