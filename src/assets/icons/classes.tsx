import { SVGProps } from "react";

export default function ClassesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
      <path d="M8 14H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 18H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 18H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
