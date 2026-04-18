'use client';

import { Icon } from '@/components';
import ProfileMenu from './profileMenu';
import { HeaderProps } from './layout.type';

export default function DeveloperHeader({
  activeItem,
  utilityPageMeta,
  utilityActions,
  onMenuToggle,
  isMobileMenuOpen,
  profileActions,
  userName,
  userTitle,
}: HeaderProps) {
  const pageTitle = utilityPageMeta?.name ?? activeItem?.name ?? 'Developer control center';
  const pageDescription =
    utilityPageMeta?.description ??
    activeItem?.description ??
    'Monitor platform health, guide school operations, and keep the team moving.';

  return (
    <header className="sticky top-0 z-10 border-b border-surfaceSoft bg-base/90 px-2 backdrop-blur py-2 lg:px-3 lg:py-none">
      <div className="flex flex-col gap-2 lg:gap-3 xl:flex-row xl:items-center xl:justify-between ">
        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <label
            className="hidden h-11 w-80 items-center gap-3 rounded-3xl border border-surfaceSoft bg-surface px-4 text-sm text-textLight transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primaryLight xl:flex"
            style={{ boxShadow: '0 12px 30px rgba(15, 23, 42, 0.06)' }}
          >
            <Icon name="search" size="small" color="textLight" />
            <input
              type="text"
              placeholder="Search schools, users…"
              style={{ width: '100%', outline: 'none', fontSize: '1rem' }}
            />
          </label>
        </div>

        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center xl:ml-6 xl:w-auto xl:flex-nowrap xl:items-center xl:justify-end">
          <div className="flex items-center justify-between gap-2 rounded-[22px] border border-surfaceSoft bg-surface p-1.5 shadow-sm sm:contents sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none xl:flex-nowrap">
            <div>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-surfaceSoft bg-surface text-textLight transition hover:border-primary hover:text-primary lg:hidden"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                onClick={onMenuToggle}
              >
                <span className="space-y-1">
                  <span className="block h-0.5 w-4 rounded-full bg-current" />
                  <span className="block h-0.5 w-4 rounded-full bg-current" />
                  <span className="block h-0.5 w-4 rounded-full bg-current" />
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2 rounded-[22px] sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none xl:flex-nowrap xl:justify-end">
              {utilityActions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-surfaceSoft bg-surface text-textLight shadow-sm transition hover:border-primary hover:bg-base hover:text-primary xl:shrink-0"
                  aria-label={action.label}
                  title={action.label}
                >
                  <Icon name={action.icon} size="small" color="textLight" />
                </button>
              ))}
            </div>
          </div>

          <div className="min-w-0 xl:w-80 xl:max-w-80 xl:shrink-0">
            <ProfileMenu actions={profileActions} userName={userName} userTitle={userTitle} />
          </div>
        </div>
      </div>
    </header>
  );
}
