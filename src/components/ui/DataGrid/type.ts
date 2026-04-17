import { GRID_COLUMN_TYPE } from './config';
import '@tanstack/react-table';
declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    type: string;
    width?: string;
    editable?: boolean;
  }
}
export type GridColumnType = (typeof GRID_COLUMN_TYPE)[keyof typeof GRID_COLUMN_TYPE];
export interface GridColumn {
  field: string;
  type: GridColumnType;
  label: string;
  sortable?: boolean;
  width?: number;
  editable?: boolean;
}

export interface GridProps {
  header?: GridColumn[];
  dataset?: unknown[];
  isLoading?: boolean;
  onUpdate?: (data: unknown[]) => void;
  onAdd?: () => void;
}
