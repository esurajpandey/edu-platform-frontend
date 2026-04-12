import { SVGProps } from 'react';

export default function FeesIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
      <path d="M8 15H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 15H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
