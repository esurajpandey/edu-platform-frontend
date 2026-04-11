import { IconName } from "@/types";
export interface MenuItem {
  name: string;
  path: string;
  icon: IconName;
  description: string;
  rbacId: string;
}

export type SidebarProps = {
  menu: MenuItem[];
  pathname: string;
  userName: string;
  userTitle: string;
  userInitials: string;
  onNavigate?: () => void;
};

export type UtilityAction = {
  label: string;
  icon: IconName;
};

export type ProfileAction = {
  label: string;
  icon: IconName;
  href?: string;
  destructive?: boolean;
  onSelect?: () => void;
};

export type HeaderProps = {
  activeItem?: MenuItem;
  utilityActions: UtilityAction[];
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  profileActions: ProfileAction[];
  userName: string;
  userTitle: string;
};
