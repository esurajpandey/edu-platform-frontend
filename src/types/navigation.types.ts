import { Permission } from "@/constants/permissions";
import { IconName } from "./icon.types";

export type MenuItem = {
  name: string;
  path: string;
  icon?: IconName;
  description?: string;
  requiredPermissions?: Permission[];
};
