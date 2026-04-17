import { useMemo } from 'react';
import { GridProps } from './type';
import { getColumnDef } from './config';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import DragIcon from './icons';

const DataGrid = ({ header = [], dataset = [], isLoading = false }: GridProps) => {
  const columns = useMemo(() => getColumnDef(header), [header]);
  const data = useMemo(() => dataset, [dataset]);

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange', // 'onChange' for ultra-smooth real-time resizing
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading)
    return (
      <div className="p-10 text-center text-textMuted font-medium animate-pulse">Loading...</div>
    );

  return (
    <div className="w-full h-full p-4 bg-base">
      <div className="h-full flex flex-col overflow-hidden border border-textMuted/30 rounded-xl shadow-sm bg-surface">
        {/* Main Scroll Container:
          - overflow-auto handles both vertical and horizontal scroll
        */}
        <div className="flex-grow overflow-auto relative custom-scrollbar">
          <table
            style={{
              width: '100%',
              minWidth: table.getCenterTotalSize(),
              tableLayout: 'fixed',
              borderCollapse: 'separate',
              borderSpacing: 0,
            }}
            className="font-sans text-left"
          >
            <thead className="sticky top-0 z-30">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header, index) => {
                    const isLastColumn = index === headerGroup.headers.length - 1;
                    return (
                      <th
                        key={header.id}
                        style={{
                          width: isLastColumn ? 'auto' : header.getSize(),
                          position: 'relative',
                        }}
                        className="px-6 py-4 text-xs font-bold capitalize tracking-wider text-textLight border-b border-r border-textMuted/20 last:border-r-0 bg-surfaceSoft shadow-[0_1px_0_0_rgba(var(--color-text-muted),0.1)]"
                      >
                        <div className="truncate">
                          {header?.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </div>

                        {/* Resize Handle */}
                        {header.column.getCanResize() && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={`absolute right-0 top-0 h-full flex items-center justify-center cursor-col-resize select-none touch-none z-10
      ${header.column.getIsResizing() ? 'bg-text/20' : 'bg-transparent hover:bg-text/10'}`}
                          >
                            <DragIcon />
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-textMuted/10">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-textMuted/10 transition-colors duration-200 group"
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const isLastColumn = index === row.getVisibleCells().length - 1;
                    return (
                      <td
                        key={cell.id}
                        style={{
                          width: isLastColumn ? 'auto' : cell.column.getSize(),
                        }}
                        className="px-6 py-2 text-sm text-text border border-textMuted/10 last:border-r-0 whitespace-nowrap overflow-hidden text-ellipsis"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="py-20 text-center text-textMuted italic text-sm bg-surface">
              No records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
