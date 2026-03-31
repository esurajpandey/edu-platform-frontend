export default function EduPlatformLogo() {
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-2xl border"
      style={{
        color: "var(--color-surface)",
        borderColor: "rgba(91, 108, 255, 0.18)",
        background: "linear-gradient(135deg, var(--color-primary), var(--color-primaryDark))",
        boxShadow: "0 12px 28px rgba(91, 108, 255, 0.28)",
      }}
    >
      <span className="text-lg font-bold tracking-[-0.04em]">E</span>
    </div>
  );
}
