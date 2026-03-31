import { APP_ROUTES } from "@/constants/app-routes";
import { Permission } from "@/constants/permissions";
import { Role } from "@/constants/roles";
import { RoleAssignment, UserDetails } from "@/types/session.types";

export type SchoolConsoleRole = Extract<Role, "school-admin" | "teacher" | "staff">;

export const ROLE_LABELS: Record<Role, string> = {
  developer: "Platform Administrator",
  "school-admin": "School Administrator",
  teacher: "Teacher",
  staff: "Staff",
  student: "Student",
};

export function isSchoolConsoleRole(role: Role | null | undefined): role is SchoolConsoleRole {
  return role === "school-admin" || role === "teacher" || role === "staff";
}

export function hasRole(roles: Role[], role: Role) {
  return roles.includes(role);
}

export function hasPermission(permissions: Permission[], permission: Permission) {
  return permissions.includes(permission);
}

export function hasAnyPermission(permissions: Permission[], required: Permission[]) {
  return required.some((permission) => permissions.includes(permission));
}

export function getRoleAssignment(
  roleAssignments: RoleAssignment[],
  role: Role | null | undefined,
  activeSchoolId?: string | null,
) {
  if (!role) {
    return undefined;
  }

  return roleAssignments.find((assignment) => {
    if (assignment.role !== role) {
      return false;
    }

    if (assignment.scope === "platform") {
      return true;
    }

    return assignment.schoolId === activeSchoolId;
  });
}

export function getRolesFromAssignments(roleAssignments: RoleAssignment[]) {
  return Array.from(new Set(roleAssignments.map((assignment) => assignment.role)));
}

export function getPermissionsForRole(
  roleAssignments: RoleAssignment[],
  role: Role | null | undefined,
  activeSchoolId?: string | null,
) {
  return getRoleAssignment(roleAssignments, role, activeSchoolId)?.permissions ?? [];
}

export function getDefaultHomePath(
  roleAssignments: RoleAssignment[],
  primaryRole?: Role | null,
  activeSchoolId?: string | null,
) {
  const primaryAssignment = getRoleAssignment(roleAssignments, primaryRole, activeSchoolId);

  if (primaryAssignment?.homePath) {
    return primaryAssignment.homePath;
  }

  const firstScopedAssignment = roleAssignments.find((assignment) =>
    assignment.scope === "platform" ? true : assignment.schoolId === activeSchoolId,
  );

  return firstScopedAssignment?.homePath ?? APP_ROUTES.login;
}

export function getRoleHomePath(
  roleAssignments: RoleAssignment[],
  role: Role,
  activeSchoolId?: string | null,
) {
  return (
    getRoleAssignment(roleAssignments, role, activeSchoolId)?.homePath ??
    getDefaultHomePath(roleAssignments, role, activeSchoolId)
  );
}

export function getFullName(user: UserDetails | null | undefined) {
  if (!user) {
    return "";
  }

  return [user.firstName, user.lastName].filter(Boolean).join(" ").trim();
}

export function getInitials(user: UserDetails | null | undefined) {
  const name = getFullName(user);

  if (!name) {
    return "";
  }

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
