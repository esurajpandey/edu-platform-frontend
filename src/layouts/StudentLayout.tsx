"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { getMenuByRole } from "@/constants/routes";
import { useAuthStore, useAuthStoreHydrated } from "@/store/auth.store";
import { DeveloperMobileDrawer } from "./developer";
import { SchoolHeader, SchoolSidebar, schoolUtilityActions } from "./school";

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
  const profileActions = [
    {
      label: "Profile",
      icon: "profile" as const,
      href: APP_ROUTES.school.student.profile,
      onSelect: () => setIsMobileMenuOpen(false),
    },
    {
      label: "Logout",
      icon: "logout" as const,
      href: APP_ROUTES.login,
      destructive: true,
      onSelect: () => {
        setIsMobileMenuOpen(false);
        logout();
        router.replace(APP_ROUTES.login);
      },
    },
  ];

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
          <SchoolHeader
            workspaceLabel="Student Workspace"
            workspaceDescription="Access your classes, attendance, fees, syllabus, and results from one student view."
            activeItem={activeItem}
            utilityActions={schoolUtilityActions}
            onMenuToggle={() => setIsMobileMenuOpen((current) => !current)}
            isMobileMenuOpen={isMobileMenuOpen}
            profileActions={profileActions}
            userName={userName}
            userTitle={userTitle}
          />

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
