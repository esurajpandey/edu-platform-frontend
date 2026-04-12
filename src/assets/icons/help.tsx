import { SVGProps } from 'react';

export default function HelpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9.75 9.25C9.75 8.00736 10.7574 7 12 7C13.2426 7 14.25 8.00736 14.25 9.25C14.25 10.1177 13.7577 10.8704 13.0369 11.2456C12.4314 11.5609 12 12.1126 12 12.7953V13.25"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="16.75" r="1" fill="currentColor" />
    </svg>
  );
}
