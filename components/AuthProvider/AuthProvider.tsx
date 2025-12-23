'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { useAuthStore } from '@/lib/store/authStore';
import { getMe } from '@/lib/api/clientApi';
import { logout } from '@/lib/api/clientApi';
const privateRoutes = ['/profile', '/notes'];

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const pathname = usePathname();
  const router = useRouter();

  const setUser = useAuthStore(store => store.setUser);
  const clearIsAuthenticated = useAuthStore(
    store => store.clearIsAuthenticated
  );

  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    enabled: isPrivateRoute,
    retry: false,
  });

  useEffect(() => {
    if (!isPrivateRoute) return;

    if (user) {
      setUser(user);
      return;
    }

    if (isError) {
      logout();
      clearIsAuthenticated();
      router.replace('/sign-in');
    }
  }, [isPrivateRoute, user, isError, setUser, clearIsAuthenticated, router]);

  if (isPrivateRoute && isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
