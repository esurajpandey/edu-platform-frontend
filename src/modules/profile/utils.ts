import { User } from '@/types/user.type';
import { ProfileField, ProfileSummary } from './types';

export function buildProfileSummary(user: User | null): ProfileSummary | null {
  if (!user) {
    return null;
  }

  return {
    name: user.name,
    email: user.email,
    username: user.username,
    userId: user.userId,
    systemRole: user.systemRole,
    status: user.status,
    schoolCount: user.schools?.length ?? 0,
  };
}

export function buildProfileFields(profile: ProfileSummary): ProfileField[] {
  return [
    { label: 'Username', value: profile.username },
    { label: 'Email', value: profile.email },
    { label: 'System Role', value: profile.systemRole },
    { label: 'Account Status', value: profile.status },
    { label: 'Schools Linked', value: String(profile.schoolCount) },
  ];
}
