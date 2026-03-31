"use client";

import { Icon } from "@/components";
import SchoolProfileMenu from "./SchoolProfileMenu";
import { SchoolHeaderProps } from "./types";

export default function SchoolHeader({
  workspaceLabel,
  workspaceDescription,
  activeItem,
  utilityActions,
  onMenuToggle,
  isMobileMenuOpen,
  profileActions,
  userName,
  userTitle,
}: SchoolHeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-surfaceSoft/80 bg-base/90 px-4 py-4 backdrop-blur lg:px-8 lg:py-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
          <div className="min-w-0 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              {workspaceLabel}
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight text-text">
              {activeItem?.name ?? "School workspace"}
            </h2>
            <p className="mt-1 text-sm text-textLight">
              {activeItem?.description ?? workspaceDescription}
            </p>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-surfaceSoft bg-surface text-textLight transition hover:border-primary hover:text-primary lg:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={onMenuToggle}
          >
            <span className="space-y-1">
              <span className="block h-0.5 w-4 rounded-full bg-current" />
              <span className="block h-0.5 w-4 rounded-full bg-current" />
              <span className="block h-0.5 w-4 rounded-full bg-current" />
            </span>
          </button>
        </div>

        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center xl:ml-6 xl:w-auto xl:flex-nowrap xl:items-start xl:justify-end xl:gap-3 xl:self-start">
          <div className="flex items-center gap-2 rounded-[22px] border border-surfaceSoft bg-surface p-1.5 shadow-sm sm:contents sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none xl:flex-nowrap xl:justify-end">
            {utilityActions.map((action) =>
              action.label === "Search" ? (
                <label
                  key={action.label}
                  className="hidden h-12 w-56 items-center gap-3 rounded-2xl border border-surfaceSoft bg-surface px-4 text-sm text-textLight shadow-sm xl:flex"
                >
                  <Icon name={action.icon} size="small" color="textLight" />
                  <input
                    type="text"
                    placeholder="Search"
                    style={{ width: "100%", outline: "none" }}
                  />
                </label>
              ) : (
                <button
                  key={action.label}
                  type="button"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl text-textLight transition hover:bg-base hover:text-primary sm:h-[50px] sm:w-auto sm:gap-2 sm:border sm:border-surfaceSoft sm:bg-surface sm:px-4 sm:text-sm sm:font-medium sm:hover:border-primary xl:shrink-0"
                  aria-label={action.label}
                  title={action.label}
                >
                  <Icon name={action.icon} size="small" color="textLight" />
                  <span className="hidden sm:inline">{action.label}</span>
                </button>
              ),
            )}
          </div>

          <div className="min-w-0 xl:w-80 xl:max-w-80 xl:shrink-0">
            <SchoolProfileMenu actions={profileActions} userName={userName} userTitle={userTitle} />
          </div>
        </div>
      </div>
    </header>
  );
}
