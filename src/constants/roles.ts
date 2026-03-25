export const ROLES = {
  DEVELOPER: "developer",
  SCHOOL_ADMIN: "school-admin",
  TEACHER: "teacher",
  STUDENT: "student",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];
