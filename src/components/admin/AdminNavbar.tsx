'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNavbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gradient-to-r from-[#0b1021] via-[#0f172a] to-[#0b1021] border-b border-orange-600/20 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo y título */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-xl">
                <span className="text-2xl filter drop-shadow-lg">🐓</span>
              </div>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">Gallo Trader</h1>
              <p className="text-xs text-orange-400/80 font-medium tracking-wide">PANEL ADMINISTRATIVO</p>
            </div>
          </div>

          {/* Navegación central */}
          <div className="hidden lg:flex items-center space-x-2 bg-[#0b1021]/60 px-3 py-2 rounded-xl border border-gray-800/50">
            <Link 
              href="/admin"
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isActive('/admin')
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            >
              📊 Dashboard
            </Link>
            <Link 
              href="/admin/ventas"
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isActive('/admin/ventas')
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            >
              💰 Ventas
            </Link>
            <Link 
              href="/admin/usuarios"
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isActive('/admin/usuarios')
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            >
              👥 Usuarios
            </Link>
            <Link 
              href="/admin/contenido"
              className={`px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                isActive('/admin/contenido')
                  ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg shadow-orange-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/80'
              }`}
            >
              📚 Contenido
            </Link>
          </div>

          {/* Usuario y acciones */}
          <div className="flex items-center space-x-4">
            {/* Link al sitio */}
            <Link 
              href="/"
              className="hidden md:flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg transition-all duration-200 border border-gray-700/50 hover:border-gray-600"
            >
              <span>Ver sitio</span>
              <span className="text-orange-400">→</span>
            </Link>

            {/* Info del usuario */}
            <div className="hidden xl:flex items-center space-x-3 px-4 py-2 bg-[#0b1021]/60 rounded-lg border border-gray-800/50">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                {session?.user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-white leading-tight">
                  {session?.user?.name || 'Admin'}
                </p>
                <p className="text-xs text-gray-400 leading-tight">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            {/* Botón cerrar sesión */}
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="group px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600/20 to-red-500/20 hover:from-red-600 hover:to-red-500 rounded-lg transition-all duration-200 border border-red-600/50 hover:border-red-500 hover:shadow-lg hover:shadow-red-600/30"
            >
              <span className="group-hover:scale-110 inline-block transition-transform">🚪</span>
              <span className="ml-2">Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
