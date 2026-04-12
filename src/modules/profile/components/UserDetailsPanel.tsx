'use client';

import { Icon } from '@/components';
import { ProfileField, ProfileSummary } from '../types';

type UserDetailsPanelProps = {
  profile: ProfileSummary;
  fields: ProfileField[];
};

export default function UserDetailsPanel({ profile, fields }: UserDetailsPanelProps) {
  return (
    <div className="space-y-6 overflow-x-hidden md:space-y-7">
      <section className="overflow-hidden rounded-[28px] border border-surfaceSoft bg-surface shadow-sm">
        <div className="bg-[linear-gradient(135deg,rgba(91,108,255,0.14),rgba(91,108,255,0.02))] px-5 py-6 md:px-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                <Icon name="user" size="medium" color="primary" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                  Profile
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-text">
                  {profile.name}
                </h1>
                <p className="mt-1 text-sm text-textLight">
                  Review your workspace identity and account details.
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit items-center rounded-full border border-surfaceSoft bg-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]">
              {profile.status}
            </div>
          </div>
        </div>

        <div className="grid gap-4 px-5 py-5 md:grid-cols-2 md:px-7 md:py-6 xl:grid-cols-3">
          {fields.map((field) => (
            <div
              key={field.label}
              className="rounded-[22px] border border-surfaceSoft bg-base px-4 py-4"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-textMuted">
                {field.label}
              </p>
              <p className="mt-2 break-words text-sm ">{field.value}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
