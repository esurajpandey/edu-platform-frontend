import { IconName, MenuItem } from "@/types";

export type SchoolUtilityAction = {
  label: string;
  icon: IconName;
};

export type SchoolProfileAction = {
  label: string;
  icon: IconName;
  href?: string;
  destructive?: boolean;
  onSelect?: () => void;
};

export type SchoolSidebarProps = {
  menu: MenuItem[];
  pathname: string;
  userName: string;
  userTitle: string;
  onNavigate?: () => void;
};

export type SchoolHeaderProps = {
  workspaceLabel: string;
  workspaceDescription: string;
  activeItem?: MenuItem;
  utilityActions: SchoolUtilityAction[];
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  profileActions: SchoolProfileAction[];
  userName: string;
  userTitle: string;
};
