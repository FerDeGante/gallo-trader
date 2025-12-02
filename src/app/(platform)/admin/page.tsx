import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  const session = await auth();
  
  if (!session) {
    return redirect('/login');
  }

  if (session.user?.role !== 'ADMIN') {
    // Si no es admin, redirigir al aula (asumiendo que es estudiante)
    return redirect('/aula');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1021] via-[#0f172a] to-[#111827]">
      <AdminNavbar />
      <main>
        <AdminDashboard />
      </main>
    </div>
  );
}
