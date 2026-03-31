"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icon } from "@/components";
import { cn } from "@/lib/cn";
import { SchoolProfileAction } from "./types";

type SchoolProfileMenuProps = {
  actions: SchoolProfileAction[];
  userName: string;
  userTitle: string;
};

export default function SchoolProfileMenu({
  actions,
  userName,
  userTitle,
}: SchoolProfileMenuProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!containerRef.current?.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleAction = (action: SchoolProfileAction) => {
    setIsOpen(false);
    action.onSelect?.();

    if (action.href) {
      router.push(action.href);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-12 w-full items-center gap-2.5 rounded-[22px] border border-surfaceSoft bg-surface px-2.5 py-1 shadow-sm transition hover:border-primary sm:w-auto sm:px-3 xl:w-full"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
          <Icon name="user" size="medium" color="primary" />
        </span>
        <span className="min-w-0 flex-1 text-left leading-tight">
          <span className="block truncate text-sm font-semibold text-text">{userName}</span>
          <span className="block truncate text-xs text-textLight">{userTitle}</span>
        </span>
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-textLight transition",
            isOpen && "rotate-180",
          )}
        >
          <Icon name="chevronDown" size="small" color="textLight" />
        </span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.7rem)] z-20 min-w-[220px] overflow-hidden rounded-[22px] border border-surfaceSoft bg-surface p-2 shadow-xl"
        >
          <div className="border-b border-surfaceSoft px-3 py-3">
            <p className="text-sm font-semibold text-text">{userName}</p>
            <p className="mt-1 text-xs text-textLight">{userTitle}</p>
          </div>

          <div className="mt-2 flex flex-col gap-1">
            {actions.map((action) =>
              action.href ? (
                <Link
                  key={action.label}
                  href={action.href}
                  role="menuitem"
                  onClick={(event) => {
                    event.preventDefault();
                    handleAction(action);
                  }}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition hover:bg-base",
                    action.destructive ? "text-danger" : "text-text",
                  )}
                >
                  <Icon
                    name={action.icon}
                    size="small"
                    color={action.destructive ? "danger" : "textLight"}
                  />
                  <span>{action.label}</span>
                </Link>
              ) : (
                <button
                  key={action.label}
                  type="button"
                  role="menuitem"
                  onClick={() => handleAction(action)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition hover:bg-base",
                    action.destructive ? "text-danger" : "text-text",
                  )}
                >
                  <Icon
                    name={action.icon}
                    size="small"
                    color={action.destructive ? "danger" : "textLight"}
                  />
                  <span>{action.label}</span>
                </button>
              ),
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
