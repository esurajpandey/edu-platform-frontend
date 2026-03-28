import { DeveloperProfileAction, DeveloperUtilityAction } from "./types";

export const developerUtilityActions: DeveloperUtilityAction[] = [
  { label: "Search", icon: "search" },
  { label: "Help", icon: "help" },
  { label: "Alerts", icon: "notification" },
];

export const developerProfileActions: Omit<DeveloperProfileAction, "onSelect">[] = [
  { label: "Profile", icon: "user", href: "/user-accounts" },
  { label: "Settings", icon: "settings", href: "/web-app-settings" },
  { label: "Logout", icon: "logout", href: "/login", destructive: true },
];
