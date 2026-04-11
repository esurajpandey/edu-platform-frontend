export const APP_ROUTES = {
  home: "/",
  login: "/login",
  user: {
    dashboard: "/dashboard",
    school: "/school",
  },
  developer: {
    root: "/developer",
    dashboard: "/developer/dashboard",
    schools: "/developer/schools",
  },
} as const;
