import { SVGProps } from "react";

export default function ExamsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7 4H17L19 6V20H7V4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M17 4V8H19" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 11H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 15H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
