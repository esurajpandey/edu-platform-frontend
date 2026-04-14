import type { ReactNode } from 'react';

export type GridColumnType = 'text' | 'number' | 'select' | 'date' | 'custom';

export interface GridColumn<T> {
  name: string;
  field: Extract<keyof T, string>;
  type?: GridColumnType;
  editable?: boolean;
  render?: (value: unknown, row: T) => ReactNode;
  options?: { label: string; value: string }[];
  /** Column width in pixels */
  width?: number;
  /** Text alignment for the column */
  align?: 'left' | 'center' | 'right';
}

export interface GridProps<T> {
  data: T[];
  columns: GridColumn<T>[];
  onChange?: (data: T[]) => void;
  /** Show skeleton loading rows */
  isLoading?: boolean;
  /** Number of skeleton rows to show while loading */
  loadingRows?: number;
  /** Message shown when data is empty */
  emptyMessage?: ReactNode;
  /** Additional class for the outer container */
  className?: string;
  /** Alternate row background color */
  striped?: boolean;
  /** Pin the header while scrolling */
  stickyHeader?: boolean;
}
