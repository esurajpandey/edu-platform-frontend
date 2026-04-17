import { createColumnHelper } from '@tanstack/react-table';
import { GridColumn } from './type';
const createUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};
export const GRID_COLUMN_TYPE = {
  NUMBER: 'number',
  STRING: 'string',
  DATE: 'date',
  SELECT: 'select',
  EMAIL: 'email',
  CUSTOM: 'custom',
} as const;
export const getColumnDef = (header: GridColumn[], showSequence: boolean = true) => {
  // Use 'any' or 'record' here because the data shape is dynamic
  const sequenceColumn: GridColumn = {
    field: '_sNo',
    label: 'S.No',
    type: GRID_COLUMN_TYPE.NUMBER,
    width: 70,
  };
   
  const finalHeader = showSequence ? [sequenceColumn, ...header] : [...header];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columnHelper = createColumnHelper<any>();

  // 3. Map over the NEW array
  return finalHeader.map((column: GridColumn) => {
    return columnHelper.accessor(column.field, {
      header: column.label ?? '',
      cell: (info) => info.getValue(),
      size: Number(column.width) || 150,
      minSize: 50,
      enableResizing: column.field !== '_sNo',
      meta: {
        type: column.type,
        editable: column.editable,
      },
    });
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTransformData = (data: any[], showSequence: boolean = true) => {
  return data.map((item, index: number) => {
    return {
      _id: item?._id ?? item?.id ?? createUniqueId(),
      ...(showSequence && { _sNo: index + 1 }),
      ...item,
    };
  });
};
