"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    for (const item of menu) {
      router.prefetch(item.path);
    }
  }, [menu, router]);

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

      <div className="mt-6 rounded-[28px] border border-surfaceSoft bg-base p-4">
        <p className="text-sm font-semibold text-text">Developer</p>
        <p className="mt-1 text-xs text-textLight">
          Manage schools, workflows, teams, and automation from one place.
        </p>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-2 overflow-y-auto">
        {menu.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              key={item.path}
              href={item.path}
              prefetch
              onClick={() => setIsMobileMenuOpen(false)}
              className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "border-primary bg-primary text-surface shadow-[0_16px_30px_rgba(91,108,255,0.22)]"
                  : "border-transparent text-textLight hover:border-surfaceSoft hover:bg-base hover:text-text"
              }`}
            >
              {item.icon ? (
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl transition ${
                    isActive ? "bg-surface/15" : "bg-surfaceSoft text-textLight"
                  }`}
                >
                  <Icon name={item.icon} size="small" color={isActive ? "surface" : "textLight"} />
                </span>
              ) : null}
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-[28px] border border-surfaceSoft bg-base p-4">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-text text-sm font-semibold text-surface">
            N
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-text">Nitin Sharma</p>
            <p className="text-xs text-textLight">Platform Administrator</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-surfaceSoft bg-surface px-3 py-2 text-sm font-medium text-textLight transition hover:border-primary hover:text-primary"
          >
            <Icon name="settings" size="small" color="textLight" />
            <span>Settings</span>
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-surfaceSoft bg-surface text-textLight transition hover:border-primary hover:text-primary"
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
        <aside className="hidden border-r border-surfaceSoft bg-surface px-6 py-6 lg:flex lg:h-full lg:w-[290px] lg:shrink-0 lg:flex-col">
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
