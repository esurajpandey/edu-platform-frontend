import { MenuItem } from "@/types";
import { Role } from "./roles";

const ROUTE_CONFIG: Record<Role, MenuItem[]> = {
  developer: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "dashboard",
      description: "Platform overview and live health.",
    },
    {
      name: "Schools",
      path: "/schools",
      icon: "school",
      description: "Manage all onboarded schools.",
    },
    {
      name: "User Accounts",
      path: "/user-accounts",
      icon: "user",
      description: "Control users, login, and ownership.",
    },
    {
      name: "School Features",
      path: "/school-features",
      icon: "settings",
      description: "Enable modules for each school.",
    },
    {
      name: "Access Control",
      path: "/access-control",
      icon: "teachers",
      description: "Assign roles and permission rules.",
    },
    {
      name: "Message Config",
      path: "/message-config",
      icon: "notification",
      description: "Set alerts, templates, and limits.",
    },
    {
      name: "Web App Settings",
      path: "/web-app-settings",
      icon: "settings",
      description: "Configure global app behavior.",
    },
    {
      name: "Branding",
      path: "/branding",
      icon: "school",
      description: "Update logos, themes, and identity.",
    },
    {
      name: "Audit Logs",
      path: "/audit-logs",
      icon: "help",
      description: "Track changes and important events.",
    },
  ],

  "school-admin": [
    { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
    { name: "Students", path: "/admin/students", icon: "students" },
    { name: "Teachers", path: "/admin/teachers", icon: "teachers" },
    { name: "Fees", path: "/admin/fees", icon: "fees" },
  ],

  teacher: [
    { name: "Dashboard", path: "/teacher/dashboard", icon: "dashboard" },
    { name: "Attendance", path: "/teacher/attendance", icon: "attendance" },
    { name: "Exams", path: "/teacher/exams", icon: "exams" },
  ],

  student: [
    { name: "Dashboard", path: "/student/dashboard", icon: "dashboard" },
    { name: "Results", path: "/student/results", icon: "results" },
  ],
};

export function getMenuByRole(role: Role): MenuItem[] {
  return ROUTE_CONFIG[role] || [];
}
