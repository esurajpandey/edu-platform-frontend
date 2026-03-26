import { MenuItem } from "@/types";
import { Role } from "./roles";

const ROUTE_CONFIG: Record<Role, MenuItem[]> = {
  developer: [
    { name: "Dashboard", path: "/dashboard", icon: "dashboard" },
    { name: "Schools", path: "/schools", icon: "school" },
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
