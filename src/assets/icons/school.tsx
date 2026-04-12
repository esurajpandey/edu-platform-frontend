import { SVGProps } from 'react';

export default function SchoolIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 10L12 5L21 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M5 10V19H19V10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 19V14H14V19" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}
