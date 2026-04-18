import { APP_ROUTES } from '@/constants/routes';

export function getHomeRouteForSystemRole(systemRole?: string | null) {
  if (systemRole?.toUpperCase() === 'DEVELOPER') {
    return APP_ROUTES.developer.dashboard;
  }

  return APP_ROUTES.user.dashboard;
}

export function isProtectedAppPath(pathname: string) {
  return (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/school') ||
    pathname.startsWith('/developer') ||
    pathname.startsWith('/profile')
  );
}
