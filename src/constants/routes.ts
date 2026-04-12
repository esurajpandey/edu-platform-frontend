import { MenuItem } from '@/types';
import { APP_ROUTES } from './app-routes';
import { PERMISSIONS, Permission } from './permissions';
import { Role } from './roles';

const DEVELOPER_MENU: MenuItem[] = [
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
    path: APP_ROUTES.developer.userAccounts,
    icon: 'user',
    description: 'Review school-wise users, ownership, and point-of-contact details.',
  },
  {
    name: 'Modules',
    path: APP_ROUTES.developer.schoolFeatures,
    icon: 'settings',
    description: 'Control enabled modules and their permission availability by school.',
  },
  {
    name: 'Messages',
    path: APP_ROUTES.developer.messageConfig,
    icon: 'notification',
    description: 'Manage message flow, credit allocation, and delivery behavior.',
  },
  {
    name: 'Access Control',
    path: APP_ROUTES.developer.accessControl,
    icon: 'teachers',
    description: 'Define role templates and permission policies.',
  },
  {
    name: 'Branding',
    path: APP_ROUTES.developer.branding,
    icon: 'school',
    description: 'Maintain tenant identity, themes, and experience settings.',
  },
  {
    name: 'Audit Logs',
    path: APP_ROUTES.developer.auditLogs,
    icon: 'help',
    description: 'Track operational changes and permission-sensitive actions.',
  },
];

const STUDENT_MENU: MenuItem[] = [
  {
    name: 'Dashboard',
    path: APP_ROUTES.school.student.dashboard,
    icon: 'dashboard',
    description: 'Review your schedule, academics, and recent activity.',
  },
  {
    name: 'Classes',
    path: APP_ROUTES.school.student.classes,
    icon: 'classes',
    description: 'See class schedule, sections, and class-related updates.',
  },
  {
    name: 'Syllabus',
    path: APP_ROUTES.school.student.syllabus,
    icon: 'syllabus',
    description: 'Track subject-wise syllabus progress and upcoming topics.',
  },
  {
    name: 'Attendance',
    path: APP_ROUTES.school.student.attendance,
    icon: 'attendance',
    description: 'Review attendance history, status, and follow-up notices.',
  },
  {
    name: 'Fee Payments',
    path: APP_ROUTES.school.student.fees,
    icon: 'fees',
    description: 'Check dues, paid receipts, and current payment status.',
  },
  {
    name: 'Results',
    path: APP_ROUTES.school.student.results,
    icon: 'results',
    description: 'Access personal academic results and performance updates.',
  },
  {
    name: 'Profile',
    path: APP_ROUTES.school.student.profile,
    icon: 'profile',
    description: 'View your student profile and account information.',
  },
];
