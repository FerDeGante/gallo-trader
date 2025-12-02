'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Procesando tu pago...');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      setStatus('error');
      setMessage('No se encontró información del pago');
      return;
    }

    processCheckout(sessionId);
  }, [searchParams]);

  const processCheckout = async (sessionId: string) => {
    try {
      setMessage('Validando tu pago...');
      
      // Llamar al endpoint que procesa el checkout
      const response = await fetch('/api/v1/checkout/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al procesar el pago');
      }

      setMessage('Creando tu cuenta...');
      
      // Si el usuario es nuevo, hacer login automático
      if (data.data.newUser && data.data.credentials) {
        setMessage('Iniciando sesión...');
        
        const result = await signIn('credentials', {
          email: data.data.credentials.email,
          password: data.data.credentials.tempPassword,
          redirect: false,
        });

        if (result?.error) {
          throw new Error('Error al iniciar sesión automáticamente');
        }
      }

      setStatus('success');
      setMessage('¡Todo listo! Redirigiendo al aula...');
      
      // Redirigir al aula después de 2 segundos
      setTimeout(() => {
        router.push('/aula');
      }, 2000);

    } catch (error) {
      console.error('Error procesando checkout:', error);
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Error desconocido');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4" 
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}>
      <div className="max-w-2xl w-full">
        {status === 'loading' && (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="mb-8 relative">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-24 w-24 border-8 border-purple-100 border-t-purple-600 mx-auto"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl">💳</span>
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {message}
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Por favor espera, estamos configurando tu acceso...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              ¡Pago completado con éxito!
            </h1>
            
            <p className="text-xl text-gray-600 mb-10">
              Bienvenido a Gallo Trader. Tu acceso al programa premium ha sido activado.
            </p>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-10 text-left">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                ¿Qué sigue?
              </h2>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                    1
                  </div>
                  <div className="pt-1">
                    <p className="text-gray-800 font-medium">Recibirás un correo de confirmación con tus credenciales</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                    2
                  </div>
                  <div className="pt-1">
                    <p className="text-gray-800 font-medium">Ya puedes acceder al aula y comenzar con las lecciones</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <div className="pt-1">
                    <p className="text-gray-800 font-medium">Tienes acceso de por vida a todo el contenido</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="flex items-center justify-center gap-3 text-purple-700 font-semibold">
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-purple-300 border-t-purple-700"></div>
              <p>{message}</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 mb-6">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hubo un problema
            </h1>
            
            <p className="text-xl text-gray-600 mb-10">
              {message}
            </p>
            
            <div className="space-y-4">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Volver al inicio
              </button>
              <p className="text-sm text-gray-500">
                Si necesitas ayuda, contacta a soporte con tu número de sesión.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center p-4" 
            style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="text-white text-2xl">Cargando...</div>
      </main>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
