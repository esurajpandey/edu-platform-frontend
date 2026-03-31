import { ReactNode } from "react";
import StudentLayout from "@/layouts/StudentLayout";

export default function Layout({ children }: { children: ReactNode }) {
  return <StudentLayout>{children}</StudentLayout>;
}
