import { Permission } from "@/constants/permissions";
import { Role } from "@/constants/roles";

export type UserProfileSettings = {
  theme: "light" | "dark" | "system";
  locale: string;
  timezone: string;
  compactNavigation: boolean;
};

export type UserDetails = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatarUrl?: string | null;
  profile: UserProfileSettings;
};

export type SchoolDetails = {
  id: string;
  name: string;
  code: string;
  branchName: string;
  academicYear: string;
  board: string;
  address: string;
};

export type RoleScope = "platform" | "school";

export type RoleAssignment = {
  role: Role;
  permissions: Permission[];
  homePath: string;
  scope: RoleScope;
  schoolId?: string;
  isPrimary?: boolean;
};

export type AuthSession = {
  user: UserDetails;
  primaryRole: Role;
  secondaryRoles: Role[];
  roleAssignments: RoleAssignment[];
  activeRole: Role;
  schools: SchoolDetails[];
  activeSchoolId: string | null;
};
