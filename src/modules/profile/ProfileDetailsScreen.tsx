'use client';

import { useAuthStore } from '@/store/auth/auth.store';
import UserDetailsPanel from './components/UserDetailsPanel';
import { buildProfileFields, buildProfileSummary } from './utils';

export default function ProfileDetailsScreen() {
  const user = useAuthStore((state) => state.user);
  const profile = buildProfileSummary(user);

  if (!profile) {
    return (
      <section className="rounded-[24px] border border-surfaceSoft bg-surface px-5 py-6 shadow-sm">
        <p className="text-base font-semibold text-text">Profile unavailable</p>
        <p className="mt-2 text-sm text-textLight">
          We could not load your user details for this session.
        </p>
      </section>
    );
  }

  return <UserDetailsPanel profile={profile} fields={buildProfileFields(profile)} />;
}
