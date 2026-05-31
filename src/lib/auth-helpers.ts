import { getServerSession } from 'next-auth';
import { authOptions } from './auth';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

export async function isAdmin() {
  const user = await getCurrentUser();
  return (user as any)?.role === 'admin';
}

export async function requireAdmin() {
  const admin = await isAdmin();
  if (!admin) {
    throw new Error('Unauthorized: Admin access required');
  }
}
