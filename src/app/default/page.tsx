import Link from "next/link";
import { UiShowcase } from "@/components";

export default function DefaultPage() {
  return (
    <main className="bg-base px-4 py-10 text-text">
      <section className="mx-auto w-full max-w-5xl rounded-2xl border border-surfaceSoft bg-surface p-8 shadow-md">
        <h1 className="text-3xl font-semibold">Default Page</h1>
        <p className="mt-3 text-sm text-textLight">
          This is a default screen. You can continue to login or open dashboard.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/login"
            className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-surface transition hover:bg-primaryDark"
          >
            Go to Login
          </Link>
          <Link
            href="/dashboard"
            className="rounded-xl border border-surfaceSoft bg-surface px-5 py-3 text-sm font-medium text-text transition hover:bg-surfaceSoft"
          >
            Open Dashboard
          </Link>
        </div>

        <UiShowcase />
      </section>
    </main>
  );
}
