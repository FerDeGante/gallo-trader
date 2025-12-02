import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6">
            <span className="text-8xl">⚠️</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pago cancelado
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            No se ha procesado ningún cargo. Puedes volver a intentarlo cuando estés listo.
          </p>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Tuviste algún problema?
            </h2>
            <p className="text-gray-700 mb-4">
              Si encontraste algún error durante el proceso de pago o tienes alguna duda, 
              no dudes en contactarnos.
            </p>
            <p className="text-sm text-gray-600">
              📧 contacto@gallotrader.com
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                Volver al inicio
              </Button>
            </Link>
            <Link href="/#programa">
              <Button variant="outline" size="lg">
                Ver contenido del programa
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
