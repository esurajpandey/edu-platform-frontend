import ConsolePlaceholderPage from "@/components/workspace/ConsolePlaceholderPage";

export default async function StudentConsolePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const current = slug?.[slug.length - 1] ?? "dashboard";

  return (
    <ConsolePlaceholderPage
      eyebrow="Student Module"
      title={current.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
      description="This student screen uses a separate student-first layout while still relying on the same centralized auth and permission model."
      tags={["school/student", current, "separate student layout"]}
    />
  );
}
