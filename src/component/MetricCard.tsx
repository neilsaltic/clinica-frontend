import type { Metrica, Tendencia } from "../types";

interface MetricCardProps {
  metrica: Metrica;
}

const colorPorTendencia: Record<Tendencia, string> = {
  positiva: 'text-emerald-600',
  negativa: 'text-rose-600',
  neutra: 'text-slate-600',
};

export function MetricCard({metrica}:MetricCardProps){
    return(
        <div className="bg-gray-800 rounded-lg shadow p-5 border border-gray-700">
  <div className="flex items-center justify-between">
    <h3 className="text-sm font-medium text-gray-400">{metrica.titulo}</h3>
    <span className="text-xl">{metrica.icono}</span>
  </div>
  <p className="mt-2 text-3xl font-bold text-gray-100">{metrica.valor}</p>
  <p className={`mt-1 text-sm ${colorPorTendencia[metrica.tendencia]}`}>
    {metrica.descripcion}
  </p>
</div>
    )
}