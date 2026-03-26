import { SVGProps } from "react";

export default function TeachersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 19C6 16.2386 8.68629 14 12 14C15.3137 14 18 16.2386 18 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 5L20 7L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
