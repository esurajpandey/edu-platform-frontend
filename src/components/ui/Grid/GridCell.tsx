import type { GridColumn } from './grid.type';
import GridEditableCell from './GridEditableCell';
import { formatCellValue, getAlignmentClassName, resolveGridAlignment } from './utils';

type GridCellProps<T extends Record<string, unknown>> = {
  column: GridColumn<T>;
  row: T;
  rowIndex: number;
  onChange?: <K extends Extract<keyof T, string>>(rowIndex: number, field: K, value: T[K]) => void;
};

export default function GridCell<T extends Record<string, unknown>>({
  column,
  row,
  rowIndex,
  onChange,
}: GridCellProps<T>) {
  const value = row[column.field];

  if (column.editable) {
    return (
      <GridEditableCell
        column={column}
        row={row}
        rowIndex={rowIndex}
        value={value}
        onChange={onChange}
      />
    );
  }

  return (
    <div
      className={`flex min-h-14 items-center border-r border-surfaceSoft px-4 text-sm font-medium text-text last:border-r-0 ${getAlignmentClassName(resolveGridAlignment(column.align, column.type))}`}
    >
      {column.render ? column.render(value, row) : formatCellValue(value, column.type)}
    </div>
  );
}
