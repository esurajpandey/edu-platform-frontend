import { SVGProps } from "react";

export default function SyllabusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6 5.5C6 4.67157 6.67157 4 7.5 4H17C18.1046 4 19 4.89543 19 6V18.5C19 19.3284 18.3284 20 17.5 20H7.5C6.67157 20 6 19.3284 6 18.5V5.5Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M9 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M6 6.5H5.5C4.67157 6.5 4 7.17157 4 8V18C4 19.1046 4.89543 20 6 20"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
