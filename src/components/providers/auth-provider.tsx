'use client';

import { useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { APP_ROUTES } from '@/constants/app-routes';
import { getHomeRouteForSystemRole, isProtectedAppPath } from '@/lib/auth-redirect';
import { useAuthStore } from '@/store/auth/auth.store';
import { Loader } from '@/components';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const { user, isAuthenticated, bootstrapAuth, clearSession, hasBootstrapped, isBootstrapping } =
    useAuthStore();

  // 1. Centralized route logic
  const isProtected = useMemo(() => isProtectedAppPath(pathname), [pathname]);
  const isAuthPage = pathname === APP_ROUTES.login || pathname === APP_ROUTES.home;

  useEffect(() => {
    const handleAuth = async () => {
      // Step A: Bootstrap if not done yet
      if (!hasBootstrapped && !isBootstrapping) {
        const success = await bootstrapAuth();
        if (!success && isProtected) {
          clearSession();
          return router.replace(APP_ROUTES.login);
        }
      }

      // Step B: Post-Bootstrap Redirection Logic
      if (hasBootstrapped) {
        const roleRoute = user?.systemRole ? getHomeRouteForSystemRole(user.systemRole) : null;

        // Redirect away from Home/Login if already authenticated
        if (isAuthPage && isAuthenticated && roleRoute) {
          return router.replace(roleRoute);
        }

        // Redirect to Login if trying to access protected route while unauthenticated
        if (isProtected && !isAuthenticated) {
          return router.replace(APP_ROUTES.login);
        }

        // Specific case for the root "/" (home) when not logged in
        if (pathname === APP_ROUTES.home && !isAuthenticated) {
          return router.replace(APP_ROUTES.login);
        }
      }
    };

    void handleAuth();
  }, [
    pathname,
    hasBootstrapped,
    isAuthenticated,
    isProtected,
    isAuthPage,
    user?.systemRole,
    bootstrapAuth,
    clearSession,
    isBootstrapping,
    router,
  ]);

  // 2. Simplified Loading States
  const showLoader =
    (!hasBootstrapped && (isProtected || isAuthPage)) || (isBootstrapping && isProtected && !user);

  if (showLoader) {
    return <Loader fullScreen label="Verifying session..." />;
  }

  return <>{children}</>;
}
