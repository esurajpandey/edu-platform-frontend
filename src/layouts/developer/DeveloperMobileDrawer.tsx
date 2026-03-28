"use client";

import { ReactNode } from "react";

type DeveloperMobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function DeveloperMobileDrawer({
  isOpen,
  onClose,
  children,
}: DeveloperMobileDrawerProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-20 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-text/30"
        aria-label="Close menu overlay"
        onClick={onClose}
      />

      <aside className="absolute left-0 top-0 flex h-full w-[88%] max-w-[320px] flex-col overflow-hidden border-r border-surfaceSoft bg-surface px-5 py-5 shadow-2xl">
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-surfaceSoft bg-base text-textLight transition hover:border-primary hover:text-primary"
            aria-label="Close menu"
            onClick={onClose}
          >
            <span className="text-lg leading-none">x</span>
          </button>
        </div>
        {children}
      </aside>
    </div>
  );
}
