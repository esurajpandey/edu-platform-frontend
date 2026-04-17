import { createColumnHelper } from '@tanstack/react-table';
import { GridColumn } from './type';
export const GRID_COLUMN_TYPE = {
  NUMBER: 'number',
  STRING: 'string',
  DATE: 'date',
  SELECT: 'select',
  EMAIL: 'email',
  CUSTOM: 'custom',
} as const;
export const getColumnDef = (header: GridColumn[]) => {
  // Use 'any' or 'record' here because the data shape is dynamic
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();

  return header.map((column: GridColumn) => {
    return columnHelper.accessor(column.field, {
      header: column.label ?? '',
      cell: (info) => info.getValue(),
      size: Number(column.width) || 150,
      minSize: 50,
      meta: {
        type: column.type,
        editable: column.editable,
      },
    });
  });
};
