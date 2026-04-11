import { MenuItem } from "@/components/layout/layout.type";
import { APP_ROUTES } from "./app-routes";
export const getMenuList = (systemRole: string): MenuItem[] => {
  const developer: MenuItem[] = [
    {
      name: "Dashboard",
      path: APP_ROUTES.developer.dashboard,
      icon: "dashboard",
      description: "Platform-wide monitoring, analytics, and operational status.",
      rbacId: "",
    },
    {
      name: "Schools",
      path: APP_ROUTES.developer.schools,
      icon: "school",
      description: "Onboard schools, review status, and manage school records.",
      rbacId: "",
    },
    {
      name: "Users",
      path: "/developer/users",
      icon: "user",
      description: "Review school-wise users, ownership, and point-of-contact details.",
      rbacId: "",
    },
    {
      name: "Module",
      path: "/developer/modules",
      icon: "settings",
      description: "Control enabled modules and their permission availability by school.",
      rbacId: "",
    },
  ];

  const user: MenuItem[] = [
    {
      name: "Dashboard",
      path: APP_ROUTES.user.dashboard,
      icon: "dashboard",
      description: "Track daily operations, visibility, and school-wide activity.",
      rbacId: "",
    },
    {
      name: "School",
      path: APP_ROUTES.user.school,
      icon: "school",
      description: "View and manage school-specific information and settings.",
      rbacId: "",
    },
    {
      name: "Staff",
      icon: "user",
      path: "/user/staff",
      description: "Add, update, and manage staff members and assignments.",
      rbacId: "",
    },
    {
      name: "Students",
      icon: "students",
      path: "/user/students",
      description: "Handle student records, admissions, and lifecycle management.",
      rbacId: "",
    },
  ];
  const menus = {
    developer,
    user,
  };
  return menus[systemRole as keyof typeof menus] || [];
};
