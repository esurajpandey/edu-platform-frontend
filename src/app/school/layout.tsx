"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import SchoolLayout from "@/layouts/SchoolLayout";
import { Role } from "@/constants/roles";

const SCHOOL_LAYOUT_COPY: Record<
  Extract<Role, "school-admin" | "teacher" | "staff">,
  { label: string; description: string }
> = {
  "school-admin": {
    label: "School Workspace",
    description:
      "Manage academics, people, fees, and school operations from one shared permission-aware workspace.",
  },
  teacher: {
    label: "School Workspace",
    description:
      "Run classes, attendance, assessments, and student follow-up from the shared school workspace.",
  },
  staff: {
    label: "School Workspace",
    description:
      "Support front-office workflows, students, fees, and day-to-day school coordination.",
  },
};

function getConsoleRoleFromPath(
  pathname: string,
): Extract<Role, "school-admin" | "teacher" | "staff"> {
  if (pathname.startsWith("/school/teacher")) {
    return "teacher";
  }

  if (pathname.startsWith("/school/staff")) {
    return "staff";
  }

  return "school-admin";
}

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const consoleRole = getConsoleRoleFromPath(pathname);
  const copy = SCHOOL_LAYOUT_COPY[consoleRole];

  if (pathname.startsWith("/school/student")) {
    return <>{children}</>;
  }

  return (
    <SchoolLayout
      consoleRole={consoleRole}
      workspaceLabel={copy.label}
      workspaceDescription={copy.description}
    >
      {children}
    </SchoolLayout>
  );
}
