export default function DeveloperDashboardPage() {
  return (
    <div className="space-y-6 overflow-x-hidden md:space-y-7">
      <section className="rounded-[24px] border border-surfaceSoft bg-surface px-4 py-4 shadow-sm md:px-5">
        <div className="flex flex-col gap-2">
          <p className="text-base font-semibold text-text">Developer dashboard</p>
          <p className="text-sm text-textLight">
            Your developer landing page is ready for role-based login redirects.
          </p>
        </div>
      </section>
    </div>
  );
}
