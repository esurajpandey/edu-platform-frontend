import { MenuItem } from "@/types";
import { APP_ROUTES } from "./app-routes";
import { PERMISSIONS, Permission } from "./permissions";
import { Role } from "./roles";
import { SchoolConsoleRole } from "@/lib/access-control";

const DEVELOPER_MENU: MenuItem[] = [
  {
    name: "Dashboard",
    path: APP_ROUTES.developer.dashboard,
    icon: "dashboard",
    description: "Platform-wide monitoring, analytics, and operational status.",
  },
  {
    name: "Schools",
    path: APP_ROUTES.developer.schools,
    icon: "school",
    description: "Onboard schools, review status, and manage school records.",
  },
  {
    name: "Users",
    path: APP_ROUTES.developer.userAccounts,
    icon: "user",
    description: "Review school-wise users, ownership, and point-of-contact details.",
  },
  {
    name: "Modules",
    path: APP_ROUTES.developer.schoolFeatures,
    icon: "settings",
    description: "Control enabled modules and their permission availability by school.",
  },
  {
    name: "Messages",
    path: APP_ROUTES.developer.messageConfig,
    icon: "notification",
    description: "Manage message flow, credit allocation, and delivery behavior.",
  },
  {
    name: "Access Control",
    path: APP_ROUTES.developer.accessControl,
    icon: "teachers",
    description: "Define role templates and permission policies.",
  },
  {
    name: "Branding",
    path: APP_ROUTES.developer.branding,
    icon: "school",
    description: "Maintain tenant identity, themes, and experience settings.",
  },
  {
    name: "Audit Logs",
    path: APP_ROUTES.developer.auditLogs,
    icon: "help",
    description: "Track operational changes and permission-sensitive actions.",
  },
];

const STUDENT_MENU: MenuItem[] = [
  {
    name: "Dashboard",
    path: APP_ROUTES.school.student.dashboard,
    icon: "dashboard",
    description: "Review your schedule, academics, and recent activity.",
  },
  {
    name: "Classes",
    path: APP_ROUTES.school.student.classes,
    icon: "classes",
    description: "See class schedule, sections, and class-related updates.",
  },
  {
    name: "Syllabus",
    path: APP_ROUTES.school.student.syllabus,
    icon: "syllabus",
    description: "Track subject-wise syllabus progress and upcoming topics.",
  },
  {
    name: "Attendance",
    path: APP_ROUTES.school.student.attendance,
    icon: "attendance",
    description: "Review attendance history, status, and follow-up notices.",
  },
  {
    name: "Fee Payments",
    path: APP_ROUTES.school.student.fees,
    icon: "fees",
    description: "Check dues, paid receipts, and current payment status.",
  },
  {
    name: "Results",
    path: APP_ROUTES.school.student.results,
    icon: "results",
    description: "Access personal academic results and performance updates.",
  },
  {
    name: "Profile",
    path: APP_ROUTES.school.student.profile,
    icon: "profile",
    description: "View your student profile and account information.",
  },
];

type SchoolWorkspaceMenuItem = Omit<MenuItem, "path"> & {
  requiredPermissions: Permission[];
  paths: Partial<Record<SchoolConsoleRole, string>>;
};

const SCHOOL_WORKSPACE_MENU: SchoolWorkspaceMenuItem[] = [
  {
    name: "Dashboard",
    icon: "dashboard",
    description: "Track daily operations, visibility, and school-wide activity.",
    requiredPermissions: [PERMISSIONS.DASHBOARD_VIEW],
    paths: {
      "school-admin": APP_ROUTES.school.admin.dashboard,
      teacher: APP_ROUTES.school.teacher.dashboard,
      staff: APP_ROUTES.school.staff.dashboard,
    },
  },
  {
    name: "School",
    icon: "school",
    description: "Maintain school details, events, and admissions communication.",
    requiredPermissions: [PERMISSIONS.SCHOOL_VIEW],
    paths: {
      "school-admin": APP_ROUTES.school.admin.school,
      teacher: APP_ROUTES.school.teacher.school,
      staff: APP_ROUTES.school.staff.school,
    },
  },
  {
    name: "Staff",
    icon: "user",
    description: "Add, update, and manage staff members and assignments.",
    requiredPermissions: [PERMISSIONS.STAFF_VIEW],
    paths: {
      "school-admin": APP_ROUTES.school.admin.staff,
      teacher: APP_ROUTES.school.teacher.staff,
      staff: APP_ROUTES.school.staff.staff,
    },
  },
  {
    name: "Students",
    icon: "students",
    description: "Handle student records, admissions, and lifecycle management.",
    requiredPermissions: [PERMISSIONS.STUDENT_VIEW],
    paths: {
      "school-admin": APP_ROUTES.school.admin.students,
      teacher: APP_ROUTES.school.teacher.students,
      staff: APP_ROUTES.school.staff.students,
    },
  },
  {
    name: "Fees",
    icon: "fees",
    description: "Review fee collections, payment status, and billing operations.",
    requiredPermissions: [PERMISSIONS.FEES_VIEW],
    paths: {
      "school-admin": APP_ROUTES.school.admin.fees,
      staff: APP_ROUTES.school.staff.fees,
    },
  },
  {
    name: "Classes",
    icon: "attendance",
    description: "Manage class operations, sections, and live attendance workflows.",
    requiredPermissions: [PERMISSIONS.CLASSES_VIEW],
    paths: {
      "school-admin": APP_ROUTES.school.admin.classes,
      teacher: APP_ROUTES.school.teacher.classes,
      staff: APP_ROUTES.school.staff.classes,
    },
  },
  {
    name: "Syllabus",
    icon: "results",
    description: "Prepare and review yearly and class-wise syllabus plans.",
    requiredPermissions: [PERMISSIONS.SYLLABUS_VIEW],
    paths: {
      "school-admin": APP_ROUTES.school.admin.syllabus,
      teacher: APP_ROUTES.school.teacher.syllabus,
    },
  },
  {
    name: "Exams & Papers",
    icon: "exams",
    description: "Publish exams, manage papers, and coordinate assessment workflows.",
    requiredPermissions: [PERMISSIONS.EXAMS_VIEW],
    paths: {
      "school-admin": APP_ROUTES.school.admin.exams,
      teacher: APP_ROUTES.school.teacher.exams,
    },
  },
  {
    name: "Results",
    icon: "results",
    description: "Prepare, publish, and review student results and corrections.",
    requiredPermissions: [PERMISSIONS.RESULTS_VIEW],
    paths: {
      "school-admin": APP_ROUTES.school.admin.results,
      teacher: APP_ROUTES.school.teacher.results,
      staff: APP_ROUTES.school.staff.results,
    },
  },
];

const ROLE_MENU_MAP: Record<Role, MenuItem[]> = {
  developer: DEVELOPER_MENU,
  "school-admin": [],
  teacher: [],
  staff: [],
  student: STUDENT_MENU,
};

export function getMenuByRole(role: Role): MenuItem[] {
  return ROLE_MENU_MAP[role] || [];
}

export function getSchoolMenuByPermissions(
  permissions: Permission[],
  consoleRole: SchoolConsoleRole,
): MenuItem[] {
  const permissionSet = new Set(permissions);

  return SCHOOL_WORKSPACE_MENU.filter((item) => {
    const hasPath = Boolean(item.paths[consoleRole]);
    const hasAccess = item.requiredPermissions.some((permission) => permissionSet.has(permission));

    return hasPath && hasAccess;
  }).map(({ paths, ...item }) => ({
    ...item,
    path: paths[consoleRole] as string,
  }));
}
