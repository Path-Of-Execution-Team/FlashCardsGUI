import GuestOnly from '@/auth/GuestOnly';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <GuestOnly>{children}</GuestOnly>;
}
