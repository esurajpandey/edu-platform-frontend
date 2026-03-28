"use client";

import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { EduPlatformLogo, Icon } from "@/components";
import { getMenuByRole } from "@/constants/routes";

const utilityActions = [
  { label: "Search", icon: "search" as const },
  { label: "Help", icon: "help" as const },
  { label: "Alerts", icon: "notification" as const },
];

export default function DeveloperLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const role = "developer";
  const menu = useMemo(() => getMenuByRole(role), [role]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const desktopNavRef = useRef<HTMLElement | null>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    for (const item of menu) {
      router.prefetch(item.path);
    }
  }, [menu, router]);

  useEffect(() => {
    if (!desktopNavRef.current || !activeItemRef.current) {
      return;
    }

    const nav = desktopNavRef.current;
    const item = activeItemRef.current;
    const navRect = nav.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    const padding = 20;
    const itemTop = itemRect.top - navRect.top + nav.scrollTop;

    if (itemRect.top < navRect.top + padding || itemRect.bottom > navRect.bottom - padding) {
      nav.scrollTo({
        top: Math.max(itemTop - nav.clientHeight / 2 + item.clientHeight / 2, 0),
        behavior: "smooth",
      });
    }
  }, [pathname]);

  const activeMenuItem = menu.find((item) => item.path === pathname) ?? menu[0];

  const sidebarContent = (
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
      <div className="mt-4 hidden rounded-[20px] border border-primary/15 bg-primary/5 px-3 py-2.5 lg:block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-textMuted">
          Current Section
        </p>
        <div className="mt-2 flex items-center gap-2.5">
          {activeMenuItem?.icon ? (
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-surface">
              <Icon name={activeMenuItem.icon} size="small" color="surface" />
            </span>
          ) : null}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">{activeMenuItem?.name}</p>
            <p className="line-clamp-2 text-[11px] leading-4 text-textLight">
              {activeMenuItem?.description ?? "Quick access to the current section."}
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-4 min-h-0 flex-1">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-8 lg:block"
          style={{ background: "linear-gradient(to bottom, var(--color-surface), transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden h-8 lg:block"
          style={{ background: "linear-gradient(to top, var(--color-surface), transparent)" }}
        />
        <nav
          ref={desktopNavRef}
          className="flex h-full flex-col gap-1.5 overflow-y-auto pr-1 scroll-smooth overscroll-contain"
        >
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                prefetch
                onClick={() => setIsMobileMenuOpen(false)}
                ref={isActive ? activeItemRef : null}
                className={`group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "border-primary bg-primary text-surface shadow-[0_8px_16px_rgba(91,108,255,0.12)]"
                    : "border-transparent text-textLight hover:border-surfaceSoft hover:bg-base hover:text-text"
                }`}
              >
                {item.icon ? (
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-xl transition ${
                      isActive ? "bg-surface/15" : "bg-surfaceSoft text-textLight"
                    }`}
                  >
                    <Icon
                      name={item.icon}
                      size="small"
                      color={isActive ? "surface" : "textLight"}
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
            N
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">Nitin Sharma</p>
            <p className="text-xs text-textLight">Platform Administrator</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-surfaceSoft bg-surface px-3 py-2 text-sm font-medium text-textLight transition hover:border-primary hover:text-primary"
          >
            <Icon name="settings" size="small" color="textLight" />
            <span>Settings</span>
          </button>
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

  return (
    <div className="h-screen overflow-hidden bg-base text-text">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col lg:flex-row">
        <aside className="hidden border-r border-surfaceSoft bg-surface px-5 py-5 lg:flex lg:h-full lg:w-[270px] lg:shrink-0 lg:flex-col">
          {sidebarContent}
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-surfaceSoft/80 bg-base/90 px-4 py-4 backdrop-blur lg:px-8 lg:py-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-xl font-semibold tracking-tight text-text">
                    Developer control center
                  </h2>
                  <p className="mt-1 text-sm text-textLight">
                    Monitor platform health, guide school operations, and keep the team moving.
                  </p>
                </div>

                <button
                  type="button"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-surfaceSoft bg-surface text-textLight transition hover:border-primary hover:text-primary lg:hidden"
                  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                  onClick={() => setIsMobileMenuOpen((current) => !current)}
                >
                  <span className="space-y-1">
                    <span className="block h-0.5 w-4 rounded-full bg-current" />
                    <span className="block h-0.5 w-4 rounded-full bg-current" />
                    <span className="block h-0.5 w-4 rounded-full bg-current" />
                  </span>
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {utilityActions.map((action) => (
                  <button
                    key={action.label}
                    type="button"
                    className="flex items-center gap-2 rounded-2xl border border-surfaceSoft bg-surface px-4 py-2.5 text-sm font-medium text-textLight transition hover:border-primary hover:text-primary"
                  >
                    <Icon name={action.icon} size="small" color="textLight" />
                    <span>{action.label}</span>
                  </button>
                ))}

                <button
                  type="button"
                  className="flex items-center gap-3 rounded-[22px] border border-surfaceSoft bg-surface px-3 py-2.5 transition hover:border-primary"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                    <Icon name="user" size="medium" color="primary" />
                  </span>
                  <span className="text-left">
                    <span className="block text-sm font-semibold text-text">Admin User</span>
                    <span className="block text-xs text-textLight">Profile and logout</span>
                  </span>
                </button>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-[1280px]">{children}</div>
          </main>
        </div>
      </div>

      {isMobileMenuOpen ? (
        <div className="fixed inset-0 z-20 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-text/30"
            aria-label="Close menu overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <aside className="absolute left-0 top-0 flex h-full w-[88%] max-w-[320px] flex-col overflow-hidden border-r border-surfaceSoft bg-surface px-5 py-5 shadow-2xl">
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-surfaceSoft bg-base text-textLight transition hover:border-primary hover:text-primary"
                aria-label="Close menu"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg leading-none">x</span>
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      ) : null}
    </div>
  );
}
