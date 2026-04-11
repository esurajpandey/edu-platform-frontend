import { Permission } from "@/constants/permissions";
import { Role } from "@/constants/roles";

export interface RoleAssignment {
  role: Role;
  permissions: Permission[];
  homePath: string;
  scope: "platform" | "school";
  schoolId?: string | null;
}

export interface UserDetails {
  firstName?: string | null;
  lastName?: string | null;
}
