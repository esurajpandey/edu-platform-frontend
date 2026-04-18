import React from 'react';

export const DragIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="8"
      height="24"
      viewBox="0 0 8 24"
      fill="none"
      className={`text-text/60 ${props.className || ''}`}
      {...props}
    >
      <circle cx="4" cy="6" r="1" fill="currentColor" />
      <circle cx="4" cy="12" r="1" fill="currentColor" />
      <circle cx="4" cy="18" r="1" fill="currentColor" />
    </svg>
  );
};
