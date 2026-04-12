import { SVGProps } from 'react';

export default function ProfileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect x="4" y="5" width="16" height="14" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <circle cx="9" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6.5 16C6.5 14.6193 7.61929 13.5 9 13.5C10.3807 13.5 11.5 14.6193 11.5 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M14 10H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
