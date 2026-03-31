import ConsolePlaceholderPage from "@/components/workspace/ConsolePlaceholderPage";

export default async function SchoolAdminConsolePage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const current = slug?.[slug.length - 1] ?? "dashboard";

  return (
    <ConsolePlaceholderPage
      eyebrow="School Admin Module"
      title={current.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
      description="This school admin module is now mounted on the centralized school route architecture and protected through auth roles plus permissions."
      tags={["school/admin", current, "permission-driven navigation"]}
    />
  );
}
