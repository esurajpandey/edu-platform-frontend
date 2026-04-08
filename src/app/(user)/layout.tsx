"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "@/constants/app-routes";
import { useAuthStore } from "@/store/auth/auth.store";
export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { logout } = useAuthStore();
  const handleLogout = async () => {
    await logout();
    router.push(APP_ROUTES.login);
  };
  return (
    <div className="min-h-screen flexbg-base ">
      <div className="flex-1 flex flex-col">
        <header className="text p-4 shadow-md flex items-center gap-4 bg-base justify-between">
          <h1 className="text-xl font-semibold">Edu Platform Dashboard</h1>
          <div>
            <button className="px-4 py-2 bg-primary text-base rounded" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
