import Link from 'next/link';
import { APP_ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-base px-4 py-8 text-text">
      <section className="w-full max-w-lg rounded-[28px] border border-surfaceSoft bg-surface px-6 py-8 text-center shadow-[0_20px_60px_rgba(31,41,55,0.08)] sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Page not found
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text">
          This page does not exist.
        </h1>
        <p className="mt-3 text-sm leading-6 sm:text-base">
          The link may be broken, or the page has not been created yet.
        </p>

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href={APP_ROUTES.user.dashboard}
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-surface transition hover:opacity-95"
          >
            Go to dashboard
          </Link>
          <Link
            href={APP_ROUTES.profile}
            className="inline-flex items-center justify-center rounded-2xl border border-surfaceSoft bg-base px-5 py-3 text-sm font-semibold text-text transition hover:border-primary hover:text-primary"
          >
            Open profile
          </Link>
        </div>
      </section>
    </main>
  );
}
