import { APP_ROUTES } from '@/constants/app-routes';
import { ProfileAction, UtilityAction } from './layout.type';

export const UtilityActions: UtilityAction[] = [
  { label: 'Search', icon: 'search' },
  { label: 'Help', icon: 'help' },
  { label: 'Alerts', icon: 'notification' },
];

export const ProfileActions: Omit<ProfileAction, 'onSelect'>[] = [
  { label: 'Profile', icon: 'user', href: APP_ROUTES.profile },
  { label: 'Settings', icon: 'settings', href: APP_ROUTES.developer.webAppSettings },
  { label: 'Logout', icon: 'logout', href: APP_ROUTES.login, destructive: true },
];
