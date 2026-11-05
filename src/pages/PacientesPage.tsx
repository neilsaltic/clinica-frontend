import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PacienteCard } from "../component/PacienteCard";
import { usePacientesStore } from "../stores/paciente.stores";
import { useFiltrosStore } from "../stores/filltrosStore";
import toast from "react-hot-toast";
import { PacienteCardSkeleton } from "../component/ui/SkeletonCardPaciente";

export function PacientesPage() {
  // Selectores de Zustand
  const pacientes = usePacientesStore((s) => s.pacientes);
  const error = usePacientesStore((s) => s.error);
  const cargar = usePacientesStore((s) => s.cargar);
  const crear = usePacientesStore((s) => s.crear);
  const eliminar = usePacientesStore((s) => s.eliminar);

  // Filtros globales desde su store
  const queryPacientes = useFiltrosStore((s) => s.queryPacientes);
  const setQueryPacientes = useFiltrosStore((s) => s.setQueryPacientes);

  // UI local (modales, inputs de formulario y estado explícito para el Skeleton)
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("1995-05-15");
  const [errorForm, setErrorForm] = useState("");

  // 👈 Estado local para forzar la visualización de los skeletons 1.5 segundos
  const [cargandoSkeleton, setCargandoSkeleton] = useState(true);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [pacienteAEliminar, setPacienteAEliminar] = useState<
    string | number | null
  >(null);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    const iniciarCarga = async () => {
      setCargandoSkeleton(true);
      await cargar();
      // Forzamos un retraso de 1.5 segundos para apreciar el Skeleton con Tailwind animate-pulse
      setTimeout(() => {
        setCargandoSkeleton(false);
      }, 1500);
    };
    iniciarCarga();
  }, [cargar]);

  const handleAgregar = async () => {
    setErrorForm("");
    if (!nombre.trim() || !email.trim()) {
      setErrorForm("Nombre y email son obligatorios");
      return;
    }

    try {
      await crear({
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: email.trim(),
        fechaNacimiento: fechaNacimiento,
      });
      toast.success("Paciente registrado");
      setNombre("");
      setApellido("");
      setEmail("");
      setFechaNacimiento("1995-05-15");
    } catch {
      toast.error("No se pudo registrar el paciente");
    }
  };

  const confirmarEliminacion = async () => {
    if (!pacienteAEliminar) return;
    setEliminando(true);
    try {
      await eliminar(pacienteAEliminar);
      toast.success("Paciente eliminado");
      setModalAbierto(false);
      setPacienteAEliminar(null);
    } catch {
      toast.error("No se pudo eliminar el paciente");
    } finally {
      setEliminando(false);
    }
  };

  const pacientesFiltrados = pacientes.filter((p) => {
    const coincideNombre =
      `${p.nombre} ${p.apellido}`
        .toLowerCase()
        .includes(queryPacientes.toLowerCase()) ||
      p.email.toLowerCase().includes(queryPacientes.toLowerCase());
    return coincideNombre;
  });

  if (error) {
    return (
      <div className="text-center py-20 text-rose-400 space-y-4">
        <p>Hubo un error: {error}</p>
        <button
          onClick={() => cargar()}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 relative">
      <h1 className="text-2xl font-bold text-gray-100">
        Lista de Pacientes (Zustand)
      </h1>

      {/* Formulario Agregar */}
      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">
          Agregar Nuevo Paciente
        </h2>
        {errorForm && <p className="text-rose-400 text-sm">{errorForm}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre *"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Apellido"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email *"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            placeholder="Fecha de Nacimiento"
            className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <button
          onClick={handleAgregar}
          className="px-6 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
        >
          + Agregar Paciente
        </button>
      </div>

      {/* Barra de búsqueda usando useFiltrosStore */}
      <div className="bg-gray-800 p-5 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-lg font-semibold text-gray-200">Buscar</h2>
        <input
          type="text"
          value={queryPacientes}
          onChange={(e) => setQueryPacientes(e.target.value)}
          placeholder="Buscar por nombre o email..."
          className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <p className="text-sm text-gray-300">
          {pacientesFiltrados.length} paciente(s) registrado(s)
        </p>
      </div>

      {/* Listado con Skeletons o tarjetas reales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cargandoSkeleton ? (
          <>
            <PacienteCardSkeleton />
            <PacienteCardSkeleton />
            <PacienteCardSkeleton />
          </>
        ) : pacientesFiltrados.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400 bg-gray-800/50 rounded-xl border border-gray-700">
            No se encontraron pacientes registrados.
          </div>
        ) : (
          pacientesFiltrados.map((paciente) => (
            <div
              key={paciente.id}
              className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col justify-between shadow-lg"
            >
              <PacienteCard paciente={paciente} />
              <div className="mt-4 pt-3 border-t border-gray-700 flex items-center justify-between">
                <Link
                  to={`/pacientes/${paciente.id}`}
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
                >
                  Ver detalle →
                </Link>
                <button
                  onClick={() => {
                    setPacienteAEliminar(paciente.id);
                    setModalAbierto(true);
                  }}
                  className="px-3 py-1 bg-rose-900/60 hover:bg-rose-800 text-rose-300 text-sm rounded-lg transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Eliminación */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-xl font-bold text-gray-100">
              Confirmar Eliminación
            </h3>
            <p className="text-gray-300">
              ¿Estás seguro de eliminar este paciente?
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setModalAbierto(false)}
                disabled={eliminando}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                disabled={eliminando}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg transition-colors"
              >
                {eliminando ? "Eliminando..." : "Sí, eliminar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
