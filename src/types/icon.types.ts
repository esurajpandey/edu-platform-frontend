import { ComponentType, SVGProps } from "react";

export type IconName = "search" | "plus";

export type IconSize = "tiny" | "small" | "medium" | "large";

export type IconColor =
  | "primary"
  | "primaryDark"
  | "primaryLight"
  | "base"
  | "surface"
  | "surfaceSoft"
  | "text"
  | "textLight"
  | "textMuted"
  | "danger";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export type IconRegistry = Record<IconName, IconComponent>;
