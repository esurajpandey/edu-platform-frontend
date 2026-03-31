import { APP_ROUTES } from "@/constants/app-routes";
import { DeveloperProfileAction, DeveloperUtilityAction } from "./types";

export const developerUtilityActions: DeveloperUtilityAction[] = [
  { label: "Search", icon: "search" },
  { label: "Help", icon: "help" },
  { label: "Alerts", icon: "notification" },
];

export const developerProfileActions: Omit<DeveloperProfileAction, "onSelect">[] = [
  { label: "Profile", icon: "user", href: APP_ROUTES.developer.userAccounts },
  { label: "Settings", icon: "settings", href: APP_ROUTES.developer.webAppSettings },
  { label: "Logout", icon: "logout", href: APP_ROUTES.login, destructive: true },
];
