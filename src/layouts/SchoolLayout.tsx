"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { getSchoolMenuByPermissions } from "@/constants/routes";
import { Role } from "@/constants/roles";
import { useAuthStore, useAuthStoreHydrated } from "@/store/auth.store";
import { DeveloperMobileDrawer } from "./developer";
import {
  SchoolHeader,
  SchoolSidebar,
  getSchoolProfileActions,
  schoolUtilityActions,
} from "./school";

type SchoolLayoutProps = {
  children: ReactNode;
  consoleRole: Extract<Role, "school-admin" | "teacher" | "staff">;
  workspaceLabel: string;
  workspaceDescription: string;
};

export default function SchoolLayout({
  children,
  consoleRole,
  workspaceLabel,
  workspaceDescription,
}: SchoolLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hasHydrated = useAuthStoreHydrated();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUser = useAuthStore((state) => state.currentUser);
  const storedPermissions = useAuthStore((state) => state.permissions);
  const setActiveRole = useAuthStore((state) => state.setActiveRole);
  const logout = useAuthStore((state) => state.logout);
  const canAccessConsole = useAuthStore((state) => state.canAccessConsole);
  const getDefaultHomePath = useAuthStore((state) => state.getDefaultHomePath);

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isAuthenticated) {
      router.replace(APP_ROUTES.login);
      return;
    }

    if (!canAccessConsole(consoleRole)) {
      router.replace(getDefaultHomePath());
      return;
    }

    setActiveRole(consoleRole);
  }, [
    canAccessConsole,
    consoleRole,
    getDefaultHomePath,
    hasHydrated,
    isAuthenticated,
    router,
    setActiveRole,
  ]);

  const menu = useMemo(
    () => getSchoolMenuByPermissions(storedPermissions, consoleRole),
    [consoleRole, storedPermissions],
  );

  useEffect(() => {
    for (const item of menu) {
      router.prefetch(item.path);
    }
  }, [menu, router]);

  const activeItem =
    menu.find((item) => pathname === item.path || pathname.startsWith(`${item.path}/`)) ?? menu[0];

  const userName = currentUser?.name ?? "School User";
  const userTitle = currentUser?.title ?? "School User";

  const profileActions = getSchoolProfileActions(consoleRole).map((action) => ({
    ...action,
    onSelect: () => {
      setIsMobileMenuOpen(false);
      if (action.label === "Logout") {
        logout();
        router.replace(APP_ROUTES.login);
      }
    },
  }));

  if (!hasHydrated) {
    return null;
  }

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
            workspaceLabel={workspaceLabel}
            workspaceDescription={workspaceDescription}
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
