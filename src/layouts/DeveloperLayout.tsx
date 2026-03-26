"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMenuByRole } from "@/constants/routes";

export default function DeveloperLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // 👉 later this should come from auth store / token
  const role = "developer";

  const menu = getMenuByRole(role);

  return (
    <div className="flex h-screen bg-base text-text">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-surfaceSoft bg-surface md:flex">
        <div className="border-b border-surfaceSoft p-4 text-xl font-bold">Dev Panel</div>

        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive ? "bg-primary text-surface" : "text-textLight hover:bg-surfaceSoft"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-surfaceSoft bg-surface px-6">
          <h1 className="text-lg font-semibold">Developer</h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
