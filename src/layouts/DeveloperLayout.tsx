"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenuByRole } from "@/constants/routes";

export default function DeveloperLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const role = "developer";
  const menu = getMenuByRole(role);

  return (
    <div className="h-screen overflow-hidden bg-base text-text">
      <header className="flex h-16 items-center border-b border-surfaceSoft bg-surface px-4">
        <h1 className="text-sm font-semibold text-text">Edu Platform</h1>
      </header>

      <div className="flex h-[calc(100vh-40px)]">
        <aside className="flex h-full w-[300px] shrink-0 flex-col border-r border-surfaceSoft bg-surface">
          <div className="border-b border-surfaceSoft px-5 py-4">
            <p className="text-sm font-semibold text-text">Developer</p>
            <p className="mt-1 text-xs text-textLight">Admin Control</p>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto p-4">
            {menu.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`block rounded-xl border px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "border-primary bg-primary text-surface shadow-sm"
                      : "border-transparent text-textLight hover:border-surfaceSoft hover:bg-base hover:text-text"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-auto p-6">
          <div className="">{children}</div>
        </main>
      </div>
    </div>
  );
}
