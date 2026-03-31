import ConsolePlaceholderPage from "@/components/workspace/ConsolePlaceholderPage";

export default async function StaffConsolePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const current = slug?.[slug.length - 1] ?? "dashboard";

  return (
    <ConsolePlaceholderPage
      eyebrow="Staff Module"
      title={current.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
      description="This staff module is routed through the shared school architecture so future screens can be added without changing the access model."
      tags={["school/staff", current, "role-aware access"]}
    />
  );
}
