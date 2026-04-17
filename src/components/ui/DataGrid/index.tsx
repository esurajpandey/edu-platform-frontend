import { useMemo } from 'react';
import { GridProps } from './type';
import { getColumnDef } from './config';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

const DataGrid = ({ header = [], dataset = [], isLoading = false }: GridProps) => {
  const columns = useMemo(() => getColumnDef(header), [header]);
  const data = useMemo(() => dataset, [dataset]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div className="p-10 text-center text-textMuted">Loading...</div>;

  return (
    <div className="w-full h-full p-4 bg-base">
      <div className="h-full flex flex-col overflow-hidden border border-textMuted/30 rounded-xl shadow-sm bg-surface">
        <div className="flex-grow overflow-y-auto overflow-x-auto relative">
          <table
            style={{
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
            }}
            className="font-sans text-left"
          >
            <thead className="sticky top-0 z-30">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-textLight border-b border-r border-textMuted/20 last:border-r-0 bg-surfaceSoft shadow-[0_1px_0_0_rgba(var(--color-text-muted),0.1)]"
                    >
                      {header?.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="divide-y divide-textMuted/10">
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-primaryLight/5 transition-colors duration-150 group"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: `${cell.column.getSize()}px` }}
                      className="px-6 py-2 text-sm text-text border border-surfaceSoft last:border-r-0 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {data.length === 0 && (
            <div className="py-20 text-center text-textMuted italic text-sm">No records found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
