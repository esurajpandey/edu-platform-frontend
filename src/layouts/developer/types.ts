import { IconName, MenuItem } from "@/types";

export type DeveloperUtilityAction = {
  label: string;
  icon: IconName;
};

export type DeveloperProfileAction = {
  label: string;
  icon: IconName;
  href?: string;
  destructive?: boolean;
  onSelect?: () => void;
};

export type DeveloperSidebarProps = {
  menu: MenuItem[];
  pathname: string;
  onNavigate?: () => void;
};

export type DeveloperHeaderProps = {
  activeItem?: MenuItem;
  utilityActions: DeveloperUtilityAction[];
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
  profileActions: DeveloperProfileAction[];
};
