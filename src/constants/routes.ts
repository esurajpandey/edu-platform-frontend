import { Role } from "./roles";

export type MenuItem = {
  name: string;
  path: string;
};

const ROUTE_CONFIG: Record<Role, MenuItem[]> = {
  developer: [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Schools", path: "/schools" },
  ],

  "school-admin": [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Students", path: "/admin/students" },
    { name: "Teachers", path: "/admin/teachers" },
    { name: "Fees", path: "/admin/fees" },
  ],

  teacher: [
    { name: "Dashboard", path: "/teacher/dashboard" },
    { name: "Attendance", path: "/teacher/attendance" },
    { name: "Exams", path: "/teacher/exams" },
  ],

  student: [
    { name: "Dashboard", path: "/student/dashboard" },
    { name: "Results", path: "/student/results" },
  ],
};

export function getMenuByRole(role: Role): MenuItem[] {
  return ROUTE_CONFIG[role] || [];
}
