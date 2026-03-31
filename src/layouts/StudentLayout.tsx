"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { getMenuByRole } from "@/constants/routes";
import { useAuthStore, useAuthStoreHydrated } from "@/store/auth.store";
import { Icon } from "@/components";
import { DeveloperMobileDrawer } from "./developer";
import { SchoolSidebar } from "./school";

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hasHydrated = useAuthStoreHydrated();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUser = useAuthStore((state) => state.currentUser);
  const hasRole = useAuthStore((state) => state.hasRole);
  const setActiveRole = useAuthStore((state) => state.setActiveRole);
  const logout = useAuthStore((state) => state.logout);
  const getDefaultHomePath = useAuthStore((state) => state.getDefaultHomePath);
  const menu = useMemo(() => getMenuByRole("student"), []);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(APP_ROUTES.login);
      return;
    }

    if (!hasRole("student")) {
      router.replace(getDefaultHomePath());
      return;
    }

    setActiveRole("student");
  }, [getDefaultHomePath, hasHydrated, hasRole, isAuthenticated, router, setActiveRole]);

  useEffect(() => {
    for (const item of menu) {
      router.prefetch(item.path);
    }
  }, [menu, router]);

  if (!hasHydrated) {
    return null;
  }

  const activeItem =
    menu.find((item) => pathname === item.path || pathname.startsWith(`${item.path}/`)) ?? menu[0];

  const userName = currentUser?.name ?? "Student";
  const userTitle = currentUser?.title ?? "Student Workspace";

  return (
    <div className="h-screen overflow-hidden bg-base text-text">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col lg:flex-row">
        <aside className="hidden border-r border-surfaceSoft bg-surface px-5 py-5 lg:flex lg:h-full lg:w-[270px] lg:shrink-0 lg:flex-col">
          <SchoolSidebar
            menu={menu}
            pathname={pathname}
            userName={userName}
            userTitle={userTitle}
          />
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-10 border-b border-surfaceSoft/80 bg-base/90 px-4 py-4 backdrop-blur lg:px-8 lg:py-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                <div className="min-w-0 max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                    Student Workspace
                  </p>
                  <h2 className="mt-1 text-xl font-semibold tracking-tight text-text">
                    {activeItem?.name ?? "Student Workspace"}
                  </h2>
                  <p className="mt-1 text-sm text-textLight">
                    {activeItem?.description ??
                      "Access your classes, attendance, fees, syllabus, and results from one student view."}
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

              <div className="flex flex-wrap items-center gap-2 xl:justify-end">
                <div className="rounded-[22px] border border-surfaceSoft bg-surface px-4 py-2 text-right shadow-sm">
                  <p className="text-sm font-semibold text-text">{userName}</p>
                  <p className="text-xs text-textLight">{userTitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    router.replace(APP_ROUTES.login);
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl border border-surfaceSoft bg-surface px-4 py-3 text-sm font-medium text-textLight transition hover:border-primary hover:text-primary"
                >
                  <Icon name="logout" size="small" color="textLight" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </header>

          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-[1280px]">{children}</div>
          </main>
        </div>
      </div>

      <DeveloperMobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <SchoolSidebar
          menu={menu}
          pathname={pathname}
          userName={userName}
          userTitle={userTitle}
          onNavigate={() => setIsMobileMenuOpen(false)}
        />
      </DeveloperMobileDrawer>
    </div>
  );
}
