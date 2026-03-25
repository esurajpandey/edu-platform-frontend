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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-4 text-xl font-bold border-b">Dev Panel</div>

        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">Developer</h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
