export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum SystemRole {
  USER = 'USER',
  DEVELOPER = 'DEVELOPER',
}
export interface User {
  userId: string;
  name: string;
  email: string;
  systemRole: SystemRole;
  username: string;
  status: Status;
  schools?: unknown[];
}
