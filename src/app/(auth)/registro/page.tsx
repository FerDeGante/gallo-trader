import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-20 px-4">
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
}
