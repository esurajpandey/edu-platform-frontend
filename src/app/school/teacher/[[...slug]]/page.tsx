import ConsolePlaceholderPage from "@/components/workspace/ConsolePlaceholderPage";

export default async function TeacherConsolePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const current = slug?.[slug.length - 1] ?? "dashboard";

  return (
    <ConsolePlaceholderPage
      eyebrow="Teacher Module"
      title={current.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
      description="This teacher module now uses the shared school shell while access stays fully controlled by the authenticated user's permissions."
      tags={["school/teacher", current, "shared school workspace"]}
    />
  );
}
