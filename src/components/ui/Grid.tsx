'use client';

import { ReactNode, useMemo } from 'react';
import { cn } from '@/lib/cn';
import GridCell from './Grid/GridCell';
import GridHeader from './Grid/GridHeader';
import type { GridColumn, GridProps } from './Grid/grid.type';

function GridSkeleton({
  columns,
  rows,
}: {
  columns: GridColumn<Record<string, unknown>>[];
  rows: number;
}) {
  return (
    <div className="divide-y divide-surfaceSoft">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`skeleton-row-${rowIndex}`}
          className="grid min-w-max items-center"
          style={{
            gridTemplateColumns: columns
              .map((column) => `${column.width ? `${column.width}px` : 'minmax(180px, 1fr)'}`)
              .join(' '),
          }}
        >
          {columns.map((column) => (
            <div
              key={`${String(column.field)}-${rowIndex}`}
              className="h-14 animate-pulse border-r border-surfaceSoft bg-surfaceSoft/70 last:border-r-0"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Grid<T extends Record<string, unknown>>({
  data,
  columns,
  onChange,
  isLoading = false,
  loadingRows = 5,
  emptyMessage = 'No records found.',
  className,
  striped = true,
  stickyHeader = true,
}: GridProps<T>) {
  const templateColumns = useMemo(
    () =>
      columns
        .map((column) => `${column.width ? `${column.width}px` : 'minmax(180px, 1fr)'}`)
        .join(' '),
    [columns],
  );

  const handleCellChange = <K extends Extract<keyof T, string>>(
    rowIndex: number,
    field: K,
    value: T[K],
  ) => {
    if (!onChange) {
      return;
    }

    const nextRows = data.map((row, index) =>
      index === rowIndex ? ({ ...row, [field]: value } as T) : row,
    );

    onChange(nextRows);
  };

  const colSpanStyle = { gridColumn: `1 / span ${Math.max(columns.length, 1)}` };

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[24px] border border-surfaceSoft bg-surface',
        className,
      )}
    >
      <div className="border-b border-surfaceSoft bg-[linear-gradient(180deg,rgba(248,250,255,0.98),rgba(255,255,255,0.98))] px-5 py-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
              Data Grid
            </p>
            <h3 className="mt-1 text-lg font-semibold text-text">Structured records</h3>
          </div>
          <div className="rounded-full border border-primary/10 bg-surface/80 px-3 py-1 text-xs font-medium text-textLight backdrop-blur">
            {isLoading ? 'Loading...' : `${data.length} row${data.length === 1 ? '' : 's'}`}
          </div>
        </div>
      </div>

      <div className="max-h-[70vh] overflow-auto bg-surface">
        <div className="min-w-full">
          <GridHeader columns={columns} templateColumns={templateColumns} sticky={stickyHeader} />

          {isLoading ? (
            <GridSkeleton
              columns={columns as GridColumn<Record<string, unknown>>[]}
              rows={loadingRows}
            />
          ) : data.length === 0 ? (
            <div
              className="grid place-items-center px-6 py-16 text-center text-sm text-textLight"
              style={templateColumns ? colSpanStyle : undefined}
            >
              <div className="max-w-sm rounded-3xl border border-dashed border-surfaceSoft bg-base/70 px-6 py-8">
                {emptyMessage as ReactNode}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-surfaceSoft">
              {data.map((row, rowIndex) => (
                <div
                  key={`grid-row-${rowIndex}`}
                  className={cn(
                    'grid min-w-max items-stretch transition-colors',
                    striped && rowIndex % 2 === 1 && 'bg-base/30',
                    'hover:bg-primary/3',
                  )}
                  style={{ gridTemplateColumns: templateColumns }}
                >
                  {columns.map((column) => (
                    <GridCell
                      key={`${String(column.field)}-${rowIndex}`}
                      column={column}
                      row={row}
                      rowIndex={rowIndex}
                      onChange={handleCellChange}
                    />
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
