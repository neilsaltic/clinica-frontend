interface StatusBadgeProps {
  activo: boolean;
}

export function StatusBadge({activo}:StatusBadgeProps){
    return (
        <span
  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
    activo
      ? 'bg-emerald-900 text-emerald-200'
      : 'bg-rose-900 text-rose-200'
  }`}
>
  {activo ? 'Sistema Operativo' : 'Modo Mantenimiento'}
</span>
    )
}