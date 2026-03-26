import { MenuItem } from "@/types";
import { Role } from "./roles";

const ROUTE_CONFIG: Record<Role, MenuItem[]> = {
  developer: [
    { name: "Dashboard", path: "/dashboard", icon: "search" },
    { name: "Schools", path: "/schools", icon: "plus" },
  ],

  "school-admin": [
    { name: "Dashboard", path: "/admin/dashboard", icon: "search" },
    { name: "Students", path: "/admin/students", icon: "plus" },
    { name: "Teachers", path: "/admin/teachers", icon: "plus" },
    { name: "Fees", path: "/admin/fees", icon: "plus" },
  ],

  teacher: [
    { name: "Dashboard", path: "/teacher/dashboard", icon: "search" },
    { name: "Attendance", path: "/teacher/attendance", icon: "plus" },
    { name: "Exams", path: "/teacher/exams", icon: "plus" },
  ],

  student: [
    { name: "Dashboard", path: "/student/dashboard", icon: "search" },
    { name: "Results", path: "/student/results", icon: "plus" },
  ],
};

export function getMenuByRole(role: Role): MenuItem[] {
  return ROUTE_CONFIG[role] || [];
}
