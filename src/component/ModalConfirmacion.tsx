interface ModalProps {
  isOpen: boolean;
  titulo: string;
  mensaje: string;
  cargando: boolean;
  onConfirmar: () => void;
  onCerrar: () => void;
}

export function ModalConfirmacion({ isOpen, titulo, mensaje, cargando, onConfirmar, onCerrar }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
        <h3 className="text-xl font-bold text-gray-100">{titulo}</h3>
        <p className="text-gray-300">{mensaje}</p>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCerrar}
            disabled={cargando}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            disabled={cargando}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white rounded-lg font-medium transition-colors"
          >
            {cargando ? 'Eliminando...' : 'Sí, eliminar'}
          </button>
        </div>
      </div>
    </div>
  );
}