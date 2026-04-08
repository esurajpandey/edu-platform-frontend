"use client";
import { useAuthStore } from "@/store/auth/auth.store";

export default function AccessControlPage() {
  const { user } = useAuthStore();
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Welcome, {user?.name || "Guest"}!</h2>
      <div className="rounded-xl bg-surface p-4 shadow">
        {/* Now safe to use user.name or other data */}
        <p className="text-textLight">
          Welcome, {user?.name || "Guest"}! This is the landing page.
        </p>
      </div>
    </div>
  );
}
