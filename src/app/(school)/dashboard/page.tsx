export default function SchoolDashboardPage() {
  return (
    <div className="space-y-6 overflow-x-hidden md:space-y-7">
      <section className="rounded-[24px] border border-surfaceSoft bg-surface px-4 py-4 shadow-sm md:px-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-primary/15">
              <div className="h-4 w-4 rounded-full bg-primary" />
            </div>

            <div className="min-w-0">
              <p className="text-base font-semibold text-text">
                You achieved 88% of school operations goals yesterday
              </p>
              <p className="mt-1 text-sm text-textLight">
                Re-use the highest performing workflow and keep admin teams moving without manual
                follow-up.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-surfaceSoft px-4 text-sm font-medium text-text transition hover:border-primary/20 hover:bg-base"
          >
            View 2 suggestions
          </button>
        </div>
      </section>
    </div>
  );
}
