type ConsolePlaceholderPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
};

export default function ConsolePlaceholderPage({
  eyebrow,
  title,
  description,
  tags,
}: ConsolePlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-surfaceSoft bg-surface px-5 py-6 shadow-sm md:px-8 md:py-8">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text">{title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-textLight">{description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-surfaceSoft bg-base px-3 py-1 text-xs font-medium text-textLight"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {[
          "Access is now fully controlled from auth + school stores.",
          "This page exists so your new route architecture is already stable.",
          "You can replace this with the final module UI whenever you are ready.",
        ].map((item, index) => (
          <article
            key={item}
            className="rounded-[24px] border border-surfaceSoft bg-surface p-5 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Block 0{index + 1}
            </p>
            <p className="mt-3 text-sm leading-6 text-textLight">{item}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
