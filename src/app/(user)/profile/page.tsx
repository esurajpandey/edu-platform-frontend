"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user/user.store";

export default function ProfilePage() {
  const { user, fetchMe } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    const loadProfile = async () => {
      setIsLoading(true);
      const response = await fetchMe();

      if (!isActive) return;

      if (!response.success) {
        setErrorMessage(response.message);
      } else {
        setErrorMessage(null);
      }

      setIsLoading(false);
    };

    void loadProfile();

    return () => {
      isActive = false;
    };
  }, [fetchMe]);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">
        Welcome, {user?.name || user?.user?.name || "Guest"}!
      </h2>
      <div className="rounded-xl bg-surface p-4 shadow">
        {isLoading ? (
          <p className="text-textLight">Loading profile...</p>
        ) : errorMessage ? (
          <p className="text-textLight">{errorMessage}</p>
        ) : null}
        <p className="text-textLight">
          Welcome, {user?.name || "Guest"}! This is the landing page.
        </p>
      </div>
    </div>
  );
}
