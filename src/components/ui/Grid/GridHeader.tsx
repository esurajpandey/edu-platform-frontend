import { cn } from '@/lib/cn';
import type { GridColumn } from './grid.type';
import { getAlignmentClassName } from './utils';

type GridHeaderProps<T> = {
  columns: GridColumn<T>[];
  templateColumns: string;
  sticky?: boolean;
};

export default function GridHeader<T>({
  columns,
  templateColumns,
  sticky = true,
}: GridHeaderProps<T>) {
  return (
    <div
      className={cn(
        'grid min-w-max border-b border-surfaceSoft bg-[linear-gradient(180deg,rgba(247,249,255,0.98),rgba(255,255,255,0.98))] backdrop-blur',
        sticky && 'sticky top-0 z-20',
      )}
      style={{ gridTemplateColumns: templateColumns }}
    >
      {columns.map((column) => (
        <div
          key={String(column.field)}
          className={cn(
            'flex min-h-14 items-center border-r border-surfaceSoft px-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-primary/85 last:border-r-0',
            getAlignmentClassName(column.align, true),
          )}
        >
          <span>{column.name}</span>
        </div>
      ))}
    </div>
  );
}
