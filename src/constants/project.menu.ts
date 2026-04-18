import { MenuItem } from '@/components/layout/layout.type';
import { APP_ROUTES } from './routes';
export const getMenuList = (systemRole: string): MenuItem[] => {
  const developer: MenuItem[] = [
    {
      name: 'Dashboard',
      path: APP_ROUTES.developer.dashboard,
      icon: 'dashboard',
      description: 'Platform-wide monitoring, analytics, and operational status.',
    },
    {
      name: 'Schools',
      path: APP_ROUTES.developer.schools,
      icon: 'school',
      description: 'Onboard schools, review status, and manage school records.',
    },
    {
      name: 'Users',
      path: '/developer/users',
      icon: 'user',
      description: 'Review school-wise users, ownership, and point-of-contact details.',
    },
    {
      name: 'Module',
      path: '/developer/modules',
      icon: 'settings',
      description: 'Control enabled modules and their permission availability by school.',
    },
  ];

  const user: MenuItem[] = [
    {
      name: 'Dashboard',
      path: APP_ROUTES.user.dashboard,
      icon: 'dashboard',
      description: 'Track daily operations, visibility, and school-wide activity.',
    },
    {
      name: 'School',
      path: APP_ROUTES.user.school,
      icon: 'school',
      description: 'View and manage school-specific information and settings.',
    },
    {
      name: 'Staff',
      icon: 'user',
      path: '/user/staff',
      description: 'Add, update, and manage staff members and assignments.',
    },
    {
      name: 'Students',
      icon: 'students',
      path: '/user/students',
      description: 'Handle student records, admissions, and lifecycle management.',
    },
  ];
  const menus = {
    developer,
    user,
  };
  return menus[systemRole as keyof typeof menus] || [];
};
