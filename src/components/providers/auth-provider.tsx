"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { getHomeRouteForSystemRole, isProtectedAppPath } from "@/lib/auth-redirect";
import { useAuthStore, getAccessToken } from "@/store/auth/auth.store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, bootstrapAuth, clearSession, hasBootstrapped } = useAuthStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (hasBootstrapped) {
        setIsInitializing(false);
        return;
      }

      const needsBootstrap = !getAccessToken() || !user;

      if (needsBootstrap) {
        const isReady = await bootstrapAuth();

        if (!isReady && isProtectedAppPath(pathname)) {
          clearSession();
          router.replace(APP_ROUTES.login);
          return;
        }
      }

      setIsInitializing(false);
    };

    void initAuth();
  }, [bootstrapAuth, clearSession, hasBootstrapped, pathname, router, user]);

  useEffect(() => {
    if (isInitializing) {
      return;
    }

    if (pathname === APP_ROUTES.home) {
      if (isAuthenticated && user?.systemRole) {
        router.replace(getHomeRouteForSystemRole(user.systemRole));
        return;
      }

      router.replace(APP_ROUTES.login);
      return;
    }

    if (!isInitializing && pathname === APP_ROUTES.login && isAuthenticated && user?.systemRole) {
      router.replace(getHomeRouteForSystemRole(user.systemRole));
    }
  }, [isAuthenticated, isInitializing, pathname, router, user?.systemRole]);

  if (
    isInitializing &&
    (isProtectedAppPath(pathname) || pathname === APP_ROUTES.login || pathname === APP_ROUTES.home)
  ) {
    return <div className="flex h-screen items-center justify-center">...Loading</div>;
  }

  return <>{children}</>;
}
