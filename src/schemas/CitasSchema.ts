import { z } from "zod";

const horaRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

const citaSchema = z.object({
  pacienteNombre: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres"),

  medicoId: z.string().min(1, "Debes seleccionar un médico"),

  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato inválido (YYYY-MM-DD)")
    .refine((fecha) => {
      const hoy = new Date().toISOString().split("T")[0];
      return fecha >= hoy;
    }, "La fecha no puede ser pasada"),

  hora: z.string().regex(horaRegex, "Formato inválido (HH:MM, 00:00 a 23:59)"),

  motivo: z
    .string()
    .min(10, "El motivo debe tener al menos 10 caracteres")
    .max(500, "El motivo no puede superar los 500 caracteres"),

  urgencia: z
    .enum(["baja", "media", "alta", "critica"])
    .refine((valor) => !!valor, {
      message: "Selecciona un nivel de urgencia",
    }),
});

export type CitaFormData = z.infer<typeof citaSchema>;

export default citaSchema;
