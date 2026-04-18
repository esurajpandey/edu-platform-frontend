/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender, Row } from '@tanstack/react-table';

interface GridRowProps {
  row: Row<any>;
}

const GridRow = ({ row }: GridRowProps) => {
  return (
    <tr className="hover:bg-primaryLight/20 text-text transition-colors duration-200 group">
      {row.getVisibleCells().map((cell, index) => {
        const isLastColumn = index === row.getVisibleCells().length - 1;
        const meta = cell.column.columnDef.meta as any;

        return (
          <td
            key={cell.id}
            style={{
              width: isLastColumn ? 'auto' : cell.column.getSize(),
              textAlign: meta?.align || 'left',
            }}
            className="px-2 py-2 text-sm border border-textMuted/10 last:border-r-0 whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};

export default GridRow;
