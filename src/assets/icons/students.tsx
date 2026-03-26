import { SVGProps } from "react";

export default function StudentsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M4 19C4 16.7909 6.23858 15 9 15C11.7614 15 14 16.7909 14 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="17" cy="9" r="2" stroke="currentColor" strokeWidth="2" />
      <path
        d="M15 18C15.4 16.5 16.8 15.5 18.5 15.5C20.2 15.5 21 16.1 21 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
