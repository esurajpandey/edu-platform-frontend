import { Status, SystemRole } from '@/types/user.type';

export interface ProfileField {
  label: string;
  value: string;
}

export interface ProfileSummary {
  name: string;
  email: string;
  username: string;
  userId: string;
  systemRole: SystemRole | string;
  status: Status | string;
  schoolCount: number;
}
