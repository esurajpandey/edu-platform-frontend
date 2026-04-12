'use client';
import { useEffect, useRef } from 'react';
import { APP_ROUTES } from '@/constants/app-routes';
import Link from 'next/link';
import { EduPlatformLogo, Icon } from '@/components';
import { cn } from '@/lib/cn';
import { SidebarProps } from './layout.type';

const isUtilityRoute = (pathname: string) =>
  pathname === APP_ROUTES.profile || pathname === APP_ROUTES.developer.webAppSettings;

export default function DeveloperSidebar({
  menu,
  pathname,
  userName,
  userTitle,
  userInitials,
  onNavigate,
}: SidebarProps) {
  const navRef = useRef<HTMLElement | null>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!navRef.current || !activeItemRef.current) {
      return;
    }

    const nav = navRef.current;
    const item = activeItemRef.current;
    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const padding = 20;
    const itemTop = itemRect.top - navRect.top + nav.scrollTop;

    if (itemRect.top < navRect.top + padding || itemRect.bottom > navRect.bottom - padding) {
      nav.scrollTo({
        top: Math.max(itemTop - nav.clientHeight / 2 + item.clientHeight / 2, 0),
        behavior: 'smooth',
      });
    }
  }, [pathname]);

  const isSettingsActive = isUtilityRoute(pathname);

  return (
    <>
      <div className="flex items-center gap-3">
        <EduPlatformLogo />
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold tracking-tight text-text">
            Edu Platform
          </h1>
          <p className="text-xs text-textLight">School management workspace</p>
        </div>
      </div>
      <div className="relative mt-4 min-h-0 flex-1">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-8 lg:block"
          style={{ background: 'linear-gradient(to bottom, var(--color-surface), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-8 lg:block"
          style={{ background: 'linear-gradient(to top, var(--color-surface), transparent)' }}
        />
        <nav
          ref={navRef}
          className="flex h-full flex-col gap-1.5 overflow-y-auto pr-1 scroll-smooth overscroll-contain"
        >
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                prefetch
                onClick={onNavigate}
                ref={isActive ? activeItemRef : null}
                className={cn(
                  'group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'border-primary bg-primary text-surface shadow-[0_8px_16px_rgba(91,108,255,0.12)]'
                    : 'border-transparent text-textLight hover:border-surfaceSoft hover:bg-base hover:text-text',
                )}
              >
                {item.icon ? (
                  <span
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-xl transition',
                      isActive ? 'bg-surface/15' : 'bg-surfaceSoft text-textLight',
                    )}
                  >
                    <Icon
                      name={item.icon}
                      size="small"
                      color={isActive ? 'surface' : 'textLight'}
                    />
                  </span>
                ) : null}
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-4 rounded-[22px] border border-surfaceSoft bg-base p-3.5">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-text text-sm font-semibold text-surface">
            {userInitials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">{userName}</p>
            <p className="text-xs text-textLight">{userTitle}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <Link
            href={APP_ROUTES.profile}
            className={cn(
              'group flex flex-1 items-center justify-center gap-2 rounded-xl border px-3 py-1 text-sm font-medium transition',
              isSettingsActive
                ? 'border-primary bg-primary text-surface shadow-[0_8px_16px_rgba(91,108,255,0.12)]'
                : 'border-surfaceSoft bg-surface text-textLight hover:border-primary hover:text-primary',
            )}
            aria-current={isSettingsActive ? 'page' : undefined}
            onClick={onNavigate}
          >
            <div className="flex items-center gap-2 px-2 py-1">
              <Icon
                name="settings"
                size="tiny"
                color={isSettingsActive ? 'surface' : 'textLight'}
              />
              <span>
                <span>Settings</span>
              </span>
            </div>
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-surfaceSoft bg-surface text-textLight transition hover:border-primary hover:text-primary"
            aria-label="Open notifications"
          >
            <Icon name="notification" size="small" color="textLight" />
          </button>
        </div>
      </div>
    </>
  );
}
