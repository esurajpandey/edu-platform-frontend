import { APP_ROUTES } from "@/constants/app-routes";
import { Role } from "@/constants/roles";
import { SchoolProfileAction, SchoolUtilityAction } from "./types";

export const schoolUtilityActions: SchoolUtilityAction[] = [
  { label: "Search", icon: "search" },
  { label: "Calendar", icon: "calendar" },
  { label: "Alerts", icon: "notification" },
];

type SchoolConsoleRole = Extract<Role, "school-admin" | "teacher" | "staff">;

export function getSchoolProfileActions(role: SchoolConsoleRole) {
  const roleRoutes = {
    "school-admin": APP_ROUTES.school.admin,
    teacher: APP_ROUTES.school.teacher,
    staff: APP_ROUTES.school.staff,
  }[role];

  return [
    { label: "Profile", icon: "user", href: roleRoutes.profile },
    { label: "Settings", icon: "settings", href: roleRoutes.settings },
    { label: "Logout", icon: "logout", href: APP_ROUTES.login, destructive: true },
  ] satisfies Omit<SchoolProfileAction, "onSelect">[];
}
