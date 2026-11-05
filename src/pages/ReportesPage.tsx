import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { api } from "../libs/axios";
import { extraerMensajeError } from "../libs/errorHandler";
import toast from "react-hot-toast";

interface EspecialidadData {
  especialidad: string;
  total: number;
}

interface CitaDiaData {
  fecha: string;
  total: number;
}

export function ReportesPage() {
  const [datosEspecialidades, setDatosEspecialidades] = useState<
    EspecialidadData[]
  >([]);
  const [datosCitasDia, setDatosCitasDia] = useState<CitaDiaData[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatosReportes = async () => {
      try {
        setCargando(true);

        // 1. Obtenemos los médicos para contar cuántos hay por especialidad
        const resMedicos = await api.get("/medicos");
        const medicos = resMedicos.data.data || resMedicos.data;

        const conteoEspecialidades: Record<string, number> = {};
        medicos.forEach((medico: { especialidad?: string }) => {
          const esp = medico.especialidad || "General";
          conteoEspecialidades[esp] = (conteoEspecialidades[esp] || 0) + 1;
        });

        const formatoBarChart = Object.keys(conteoEspecialidades).map(
          (esp) => ({
            especialidad: esp,
            total: conteoEspecialidades[esp],
          }),
        );
        setDatosEspecialidades(formatoBarChart);

        // 2. Obtenemos las citas para la tendencia por día
        const resCitas = await api.get("/citas");
        const citas = resCitas.data.data || resCitas.data;

        const conteoPorFecha: Record<string, number> = {};
        citas.forEach((cita: { fechaHora?: string; fecha?: string }) => {
          const fechaRaw = cita.fechaHora || cita.fecha || "";
          const fecha = fechaRaw.split("T")[0];
          if (fecha) {
            conteoPorFecha[fecha] = (conteoPorFecha[fecha] || 0) + 1;
          }
        });

        const formatoLineChart = Object.keys(conteoPorFecha)
          .sort()
          .slice(-7)
          .map((fecha) => ({
            fecha,
            total: conteoPorFecha[fecha],
          }));

        setDatosCitasDia(formatoLineChart);
      } catch (err) {
        toast.error(extraerMensajeError(err));
      } finally {
        setCargando(false);
      }
    };

    cargarDatosReportes();
  }, []);

  if (cargando) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-100">
          Reportes y Estadísticas
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-80 animate-pulse flex items-center justify-center text-gray-500">
            Cargando gráficos...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-100">
          Reportes y Estadísticas
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Análisis visual del rendimiento de la clínica
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Barras: Médicos / Especialidades */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-lg font-semibold text-gray-200">
            Distribución por Especialidad
          </h2>
          {datosEspecialidades.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No hay datos disponibles
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={datosEspecialidades}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="especialidad" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F3F4F6",
                  }}
                />
                <Bar dataKey="total" fill="#059669" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Gráfico de Líneas: Citas por Día */}
        <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg space-y-4">
          <h2 className="text-lg font-semibold text-gray-200">
            Tendencia de Citas por Día
          </h2>
          {datosCitasDia.length === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No hay datos disponibles
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={datosCitasDia}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="fecha" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F3F4F6",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#38BDF8"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
