import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <span className="text-8xl mb-6">🔍</span>
      <h1 className="text-4xl font-bold text-gray-100 mb-4">404</h1>
      <p className="text-xl text-gray-400 mb-8">Página no encontrada</p>
      <Link
        to="/"
        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-colors"
      >
        ← Ir al inicio
      </Link>
    </div>
  )
}