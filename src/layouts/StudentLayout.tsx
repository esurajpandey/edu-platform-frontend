"use client";

import { ReactNode, useEffect, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { getMenuByRole } from "@/constants/routes";
import { getFullName, ROLE_LABELS } from "@/lib/access-control";
import { useAuthStore } from "@/store/auth.store";
import { EduPlatformLogo, Icon } from "@/components";
import { cn } from "@/lib/cn";

export default function StudentLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const hasRole = useAuthStore((state) => state.hasRole);
  const setActiveRole = useAuthStore((state) => state.setActiveRole);
  const logout = useAuthStore((state) => state.logout);
  const getDefaultHomePath = useAuthStore((state) => state.getDefaultHomePath);
  const activeSchool = useAuthStore((state) => state.activeSchool);
  const menu = useMemo(() => getMenuByRole("student"), []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(APP_ROUTES.login);
      return;
    }

    if (!hasRole("student")) {
      router.replace(getDefaultHomePath());
      return;
    }

    setActiveRole("student");
  }, [getDefaultHomePath, hasRole, isAuthenticated, router, setActiveRole]);

  return (
    <div className="min-h-screen bg-base text-text">
      <div className="mx-auto max-w-[1180px] px-4 py-5 md:px-6 lg:px-8 lg:py-8">
        <header className="rounded-[28px] border border-surfaceSoft bg-surface px-5 py-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <EduPlatformLogo />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                  Student Workspace
                </p>
                <h1 className="mt-1 text-2xl font-semibold tracking-tight text-text">
                  {getFullName(user) || "Student"}
                </h1>
                <p className="mt-1 text-sm text-textLight">
                  {activeSchool
                    ? `${ROLE_LABELS.student} · ${activeSchool.name}`
                    : "Personal academic workspace"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {menu.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm font-medium transition",
                      isActive
                        ? "border-primary bg-primary text-surface"
                        : "border-surfaceSoft bg-base text-textLight hover:border-primary/30 hover:text-text",
                    )}
                  >
                    {item.icon ? (
                      <Icon
                        name={item.icon}
                        size="small"
                        color={isActive ? "surface" : "textLight"}
                      />
                    ) : null}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  logout();
                  router.replace(APP_ROUTES.login);
                }}
                className="inline-flex items-center gap-2 rounded-2xl border border-surfaceSoft bg-base px-4 py-2 text-sm font-medium text-textLight transition hover:border-primary/30 hover:text-text"
              >
                <Icon name="logout" size="small" color="textLight" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mt-6">{children}</main>
      </div>
    </div>
  );
}
