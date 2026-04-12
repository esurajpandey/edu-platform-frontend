import { SVGProps } from 'react';

export default function NotificationIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9V13L20 16H4L6 13V9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 19C10.5 19.8 11.1 20 12 20C12.9 20 13.5 19.8 14 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
