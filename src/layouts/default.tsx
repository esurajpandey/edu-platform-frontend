"use client";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { APP_ROUTES } from "@/constants/app-routes";
import { usePathname, useRouter } from "next/navigation";
import { getMenuList } from "../constants/project.menu";
import { Header, MobileDrawer, Sidebar, ProfileActions, UtilityActions } from "@/components/layout";
import { useAuthStore } from "@/store/auth/auth.store";
export default function DeveloperLayout({ children }: { children: ReactNode }) {
  const role = "user";
  const pathname = usePathname();
  const router = useRouter();
  const menu = useMemo(() => getMenuList(role), [role]);
  const { user, fetchMe, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    for (const item of menu) {
      router.prefetch(item.path);
    }
  }, [menu, router]);
  const activeItem = menu.find((item) => item.path === pathname) ?? menu[0];

  useEffect(() => {
    let isActive = true;
    const loadProfile = async () => {
      setIsLoading(true);
      await fetchMe();
      if (!isActive) return;
      setIsLoading(false);
    };
    void loadProfile();
    return () => {
      isActive = false;
    };
  }, [fetchMe]);
  const userName = user?.name ?? "User";
  const userTitle = "Platform Administrator";
  const userInitials = "PU";
  const profileActions = ProfileActions.map((action) => ({
    ...action,
    onSelect: async () => {
      setIsMobileMenuOpen(false);
      if (action.label === "Logout") {
        await logout();
        router.replace(APP_ROUTES.login);
      }
    },
  }));

  return (
    <div className="h-screen overflow-hidden bg-base text-text">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col lg:flex-row">
        <aside className="hidden border-r border-surfaceSoft bg-surface px-5 py-5 lg:flex lg:h-full lg:w-[270px] lg:shrink-0 lg:flex-col">
          <Sidebar
            menu={menu}
            pathname={pathname}
            userName={userName}
            userTitle={userTitle}
            userInitials={userInitials}
          />
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <Header
            activeItem={activeItem}
            utilityActions={UtilityActions}
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

      <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <Sidebar
          menu={menu}
          pathname={pathname}
          userName={userName}
          userTitle={userTitle}
          userInitials={userInitials}
          onNavigate={() => setIsMobileMenuOpen(false)}
        />
      </MobileDrawer>
    </div>
  );
}
