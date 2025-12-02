import AuthGuard from '@/components/auth/AuthGuard';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
