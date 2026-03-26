export default function EduPlatformLogo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5">
        <path
          d="M6 9.5L16 5L26 9.5L16 14L6 9.5Z"
          stroke="var(--color-primary)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M9 13V19.5L16 23L23 19.5V13"
          stroke="var(--color-primaryDark)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M16 14V23" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M11 18H13"
          stroke="var(--color-primaryLight)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
