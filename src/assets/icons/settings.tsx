import { SVGProps } from 'react';

export default function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      <path
        d="M19.4 15A1.7 1.7 0 0 0 19.74 16.87L19.8 16.93A2 2 0 1 1 16.97 19.76L16.91 19.7A1.7 1.7 0 0 0 15.04 19.36A1.7 1.7 0 0 0 14 20.92V21A2 2 0 1 1 10 21V20.91A1.7 1.7 0 0 0 8.89 19.35A1.7 1.7 0 0 0 7.03 19.69L6.97 19.75A2 2 0 1 1 4.14 16.92L4.2 16.86A1.7 1.7 0 0 0 4.54 15A1.7 1.7 0 0 0 3 14H2.91A2 2 0 1 1 2.91 10H3A1.7 1.7 0 0 0 4.54 8.89A1.7 1.7 0 0 0 4.2 7.03L4.14 6.97A2 2 0 1 1 6.97 4.14L7.03 4.2A1.7 1.7 0 0 0 8.89 4.54H8.99A1.7 1.7 0 0 0 10 3V2.91A2 2 0 1 1 14 2.91V3A1.7 1.7 0 0 0 15.11 4.54A1.7 1.7 0 0 0 16.97 4.2L17.03 4.14A2 2 0 1 1 19.86 6.97L19.8 7.03A1.7 1.7 0 0 0 19.46 8.89V8.99A1.7 1.7 0 0 0 21 10H21.09A2 2 0 1 1 21.09 14H21A1.7 1.7 0 0 0 19.46 15H19.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
