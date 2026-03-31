import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEMO_AUTH_COOKIE } from "@/constants/auth";
import { Permission } from "@/constants/permissions";
import { Role } from "@/constants/roles";
import {
  getDefaultHomePath,
  getFullName,
  getInitials,
  getPermissionsForRole,
  getRoleAssignment,
  getRolesFromAssignments,
  hasAnyPermission,
  hasPermission,
  hasRole,
  ROLE_LABELS,
} from "@/lib/access-control";
import { AuthSession, RoleAssignment, SchoolDetails, UserDetails } from "@/types/session.types";

type CurrentUserContext = {
  id: string;
  name: string;
  initials: string;
  email: string;
  title: string;
  activeRole: Role | null;
  activeSchoolId: string | null;
};

type AuthState = {
  hasHydrated: boolean;
  isAuthenticated: boolean;
  user: UserDetails | null;
  currentUser: CurrentUserContext | null;
  primaryRole: Role | null;
  secondaryRoles: Role[];
  roles: Role[];
  activeRole: Role | null;
  permissions: Permission[];
  roleAssignments: RoleAssignment[];
  schools: SchoolDetails[];
  activeSchoolId: string | null;
  activeSchool: SchoolDetails | null;
  hydrateSession: (session: AuthSession) => string;
  setActiveRole: (role: Role) => void;
  setActiveSchool: (schoolId: string) => void;
  hasRole: (role: Role) => boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  canAccessConsole: (role: Role) => boolean;
  getDefaultHomePath: () => string;
  logout: () => void;
};

const initialState = {
  hasHydrated: false,
  isAuthenticated: false,
  user: null as UserDetails | null,
  currentUser: null as CurrentUserContext | null,
  primaryRole: null as Role | null,
  secondaryRoles: [] as Role[],
  roles: [] as Role[],
  activeRole: null as Role | null,
  permissions: [] as Permission[],
  roleAssignments: [] as RoleAssignment[],
  schools: [] as SchoolDetails[],
  activeSchoolId: null as string | null,
  activeSchool: null as SchoolDetails | null,
};

function setDemoCookie(value: "1" | "") {
  if (typeof document === "undefined") {
    return;
  }

  if (value) {
    document.cookie = `${DEMO_AUTH_COOKIE}=${value}; path=/; max-age=31536000`;
    return;
  }

  document.cookie = `${DEMO_AUTH_COOKIE}=; path=/; max-age=0`;
}

function getResolvedPermissions(
  roleAssignments: RoleAssignment[],
  activeRole: Role | null,
  activeSchoolId: string | null,
) {
  return getPermissionsForRole(roleAssignments, activeRole, activeSchoolId);
}

function getResolvedSchool(schools: SchoolDetails[], activeSchoolId: string | null) {
  return schools.find((school) => school.id === activeSchoolId) ?? null;
}

function getCurrentUserContext(
  user: UserDetails | null,
  activeRole: Role | null,
  activeSchool: SchoolDetails | null,
): CurrentUserContext | null {
  if (!user) {
    return null;
  }

  const name = getFullName(user) || user.email;
  const title = activeRole
    ? activeSchool
      ? `${ROLE_LABELS[activeRole]} · ${activeSchool.name}`
      : ROLE_LABELS[activeRole]
    : "User";

  return {
    id: user.id,
    name,
    initials: getInitials(user) || "U",
    email: user.email,
    title,
    activeRole,
    activeSchoolId: activeSchool?.id ?? null,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...initialState,

      hydrateSession: (session) => {
        const roles = getRolesFromAssignments(session.roleAssignments);
        const permissions = getResolvedPermissions(
          session.roleAssignments,
          session.activeRole,
          session.activeSchoolId,
        );
        const activeSchool = getResolvedSchool(session.schools, session.activeSchoolId);

        set({
          hasHydrated: true,
          isAuthenticated: true,
          user: session.user,
          currentUser: getCurrentUserContext(session.user, session.activeRole, activeSchool),
          primaryRole: session.primaryRole,
          secondaryRoles: session.secondaryRoles,
          roles,
          activeRole: session.activeRole,
          permissions,
          roleAssignments: session.roleAssignments,
          schools: session.schools,
          activeSchoolId: session.activeSchoolId,
          activeSchool,
        });

        setDemoCookie("1");

        return getDefaultHomePath(
          session.roleAssignments,
          session.primaryRole,
          session.activeSchoolId,
        );
      },

      setActiveRole: (role) =>
        set((state) => ({
          activeRole: role,
          permissions: getResolvedPermissions(state.roleAssignments, role, state.activeSchoolId),
          currentUser: getCurrentUserContext(state.user, role, state.activeSchool),
        })),

      setActiveSchool: (schoolId) =>
        set((state) => {
          const activeSchool = getResolvedSchool(state.schools, schoolId);

          return {
            activeSchoolId: schoolId,
            activeSchool,
            permissions: getResolvedPermissions(state.roleAssignments, state.activeRole, schoolId),
            currentUser: getCurrentUserContext(state.user, state.activeRole, activeSchool),
          };
        }),

      hasRole: (role) => hasRole(get().roles, role),

      hasPermission: (permission) => hasPermission(get().permissions, permission),

      hasAnyPermission: (permissions) => hasAnyPermission(get().permissions, permissions),

      canAccessConsole: (role) =>
        Boolean(getRoleAssignment(get().roleAssignments, role, get().activeSchoolId)),

      getDefaultHomePath: () =>
        getDefaultHomePath(get().roleAssignments, get().primaryRole, get().activeSchoolId),

      logout: () => {
        set({
          ...initialState,
          hasHydrated: true,
        });
        setDemoCookie("");
      },
    }),
    {
      name: "edu-auth-store",
      onRehydrateStorage: () => (state) => {
        if (!state?.hasHydrated) {
          useAuthStore.setState({ hasHydrated: true });
        }
      },
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        currentUser: state.currentUser,
        primaryRole: state.primaryRole,
        secondaryRoles: state.secondaryRoles,
        roles: state.roles,
        activeRole: state.activeRole,
        permissions: state.permissions,
        roleAssignments: state.roleAssignments,
        schools: state.schools,
        activeSchoolId: state.activeSchoolId,
        activeSchool: state.activeSchool,
      }),
    },
  ),
);

export function useAuthStoreHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}
