"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getMenuByRole } from "@/constants/routes";
import {
  DeveloperHeader,
  DeveloperMobileDrawer,
  DeveloperSidebar,
  developerProfileActions,
  developerUtilityActions,
} from "./developer";

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

  const activeItem = menu.find((item) => item.path === pathname) ?? menu[0];
  const profileActions = developerProfileActions.map((action) => ({
    ...action,
    onSelect: () => setIsMobileMenuOpen(false),
  }));

  return (
    <div className="h-screen overflow-hidden bg-base text-text">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col lg:flex-row">
        <aside className="hidden border-r border-surfaceSoft bg-surface px-5 py-5 lg:flex lg:h-full lg:w-[270px] lg:shrink-0 lg:flex-col">
          <DeveloperSidebar menu={menu} pathname={pathname} />
        </aside>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <DeveloperHeader
            activeItem={activeItem}
            utilityActions={developerUtilityActions}
            onMenuToggle={() => setIsMobileMenuOpen((current) => !current)}
            isMobileMenuOpen={isMobileMenuOpen}
            profileActions={profileActions}
          />

          <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-[1280px]">{children}</div>
          </main>
        </div>
      </div>

      <DeveloperMobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
        <DeveloperSidebar
          menu={menu}
          pathname={pathname}
          onNavigate={() => setIsMobileMenuOpen(false)}
        />
      </DeveloperMobileDrawer>
    </div>
  );
}
