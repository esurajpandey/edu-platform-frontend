const recommendations = [
  {
    title: "Revenue",
    value: "₹7,07,000",
    note: "Increase +15% from last cycle",
    change: "+15%",
    tone: "bg-primary/10",
  },
  {
    title: "Return of expenses",
    value: "300%",
    note: "Increase +10% from planning baseline",
    change: "+10%",
    tone: "bg-surfaceSoft",
  },
  {
    title: "Campaign",
    value: "₹3,80,000",
    note: "Decrease by 18% from previous launch",
    change: "-10%",
    tone: "bg-primary/5",
  },
];

const workload = [
  { label: "Automate", value: "65.6%", color: "bg-primary" },
  { label: "Regular work", value: "35.4%", color: "bg-textMuted" },
];

export default function DeveloperDashboardPage() {
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
                You achieved 88% of automation goals yesterday
              </p>
              <p className="mt-1 text-sm text-textLight">
                Re-use a high-performing flow and launch a fresh developer campaign faster.
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

      <section className="rounded-[28px] border border-surfaceSoft bg-surface px-4 py-6 shadow-sm md:px-8 md:py-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_440px] xl:items-start">
          <div className="max-w-[460px]">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] border border-dashed border-primary/30 bg-primary/10 text-sm font-semibold text-primary">
                IMG
              </div>

              <div className="min-w-0">
                <p className="text-lg font-semibold text-text">Hello, Developer!</p>
                <p className="text-sm text-textLight">Engineering workspace overview</p>
              </div>
            </div>

            <div className="mt-6">
              <h1 className="max-w-md text-3xl font-semibold leading-[1.02] tracking-tight text-text sm:text-4xl lg:text-[4rem]">
                8 hours saved
                <span className="block text-textMuted">thanks to smart automation!</span>
              </h1>

              <p className="mt-5 text-sm font-medium text-textLight">
                Increase <span className="text-primary">+15%</span> from last month
              </p>

              <button
                type="button"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-primary px-5 text-sm font-semibold text-surface transition hover:bg-primaryDark"
              >
                More automations
              </button>
            </div>
          </div>

          <div className="relative grid gap-5 border-t border-surfaceSoft pt-8 lg:grid-cols-[minmax(0,1fr)_180px] xl:border-t-0 xl:pt-0 xl:grid-cols-1">
            <div className="flex items-center justify-center">
              <div className="relative aspect-square w-full max-w-[340px] rounded-full bg-base">
                <div className="absolute inset-[18px] rounded-full border-[18px] border-surface" />
                <div className="absolute inset-[18px] rounded-full border-[18px] border-transparent border-t-primary border-r-primaryLight border-l-primary/10 rotate-[22deg]" />
                <div className="absolute bottom-[42px] right-[52px] h-[88px] w-[32px] rotate-[34deg] rounded-full bg-surfaceSoft" />
                <div className="absolute right-[56px] top-[50px] flex h-14 w-14 items-center justify-center rounded-full bg-text text-surface shadow-lg">
                  <div className="h-5 w-5 rounded-full border border-surface/70">
                    <div className="mx-auto mt-[3px] h-2 w-2 rounded-full bg-surface/80" />
                  </div>
                </div>

                <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
                  <p className="text-4xl font-semibold tracking-tight text-text sm:text-6xl">820</p>
                  <p className="mt-2 text-sm font-medium text-textLight">Total minutes saved</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 xl:absolute xl:right-0 xl:top-4 xl:w-[180px]">
              {workload.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-2xl border border-surfaceSoft bg-surface px-4 py-3"
                >
                  <div className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <span className="min-w-0 text-sm font-medium text-text">{item.label}</span>
                  </div>
                  <span className="text-sm text-textLight">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-surfaceSoft bg-surface px-4 py-6 shadow-sm md:px-8 md:py-8">
        <div className="flex flex-col gap-4 border-b border-surfaceSoft pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-text">Recommendations</h2>
            <p className="mt-1 text-sm text-textLight">
              Keep an eye on the strongest signals across your developer workspace.
            </p>
          </div>

          <div className="inline-flex max-w-full flex-wrap rounded-2xl border border-surfaceSoft bg-base p-1">
            {["Today", "Week", "Month"].map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  index === 0 ? "bg-surface text-text shadow-sm" : "text-textLight hover:text-text"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {recommendations.map((item) => (
            <article
              key={item.title}
              className={`rounded-[24px] border border-surfaceSoft p-5 shadow-sm ${item.tone}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-surfaceSoft bg-surface text-xs font-semibold text-textLight">
                    {item.title.slice(0, 2).toUpperCase()}
                  </div>
                  <p className="min-w-0 text-sm font-semibold text-text">{item.title}</p>
                </div>

                <span className="shrink-0 rounded-full bg-text px-3 py-1 text-xs font-semibold text-surface">
                  {item.change}
                </span>
              </div>

              <p className="mt-8 break-words text-3xl font-semibold tracking-tight text-text sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm text-textLight">{item.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
