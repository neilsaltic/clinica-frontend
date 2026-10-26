import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginSchema, type LoginFormData } from '../schemas/loginSchema';
import { login } from '../services/auth';
import { useAuthStore } from '../stores/authStore';
import { extraerMensajeError } from '../libs/errorHandler';

export function LoginPage() {
  const { login: setAuth } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { usuario: '', password: '' },
  });

  const onSubmit = async (datos: LoginFormData) => {
    try {
      const { token, usuario } = await login(datos);
      setAuth(token, usuario);
      toast.success('¡Bienvenido!');
      navigate('/', { replace: true });
    } catch (err) {
      toast.error(extraerMensajeError(err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 border border-gray-700 rounded-xl p-8 shadow-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-100">Clínica Salud Integral</h1>
          <p className="text-gray-400 text-sm mt-1">Inicia sesión en tu cuenta</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Usuario</label>
            <input
              type="text"
              {...register('usuario')}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.usuario ? 'border-rose-500' : 'border-gray-600'
              }`}
              placeholder="Ej. recepcion_01"
            />
            {errors.usuario && <p className="text-rose-400 text-sm mt-1">{errors.usuario.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Contraseña</label>
            <input
              type="password"
              {...register('password')}
              className={`w-full px-4 py-2.5 rounded-lg bg-gray-700 border text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                errors.password ? 'border-rose-500' : 'border-gray-600'
              }`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-rose-400 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-medium py-3 rounded-lg transition-colors"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}