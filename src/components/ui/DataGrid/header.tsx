/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import DragIcon from './icons';

interface GridHeaderProps {
  headerGroups: HeaderGroup<any>[];
}

const GridHeader = ({ headerGroups }: GridHeaderProps) => {
  return (
    <thead className="sticky top-0 z-30">
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            const isLastColumn = index === headerGroup.headers.length - 1;
            const meta = header.column.columnDef.meta as any;

            return (
              <th
                key={header.id}
                style={{
                  width: isLastColumn ? 'auto' : header.getSize(),
                  position: 'relative',
                  textAlign: meta?.align || 'left',
                }}
                className="px-2 py-4 text-xs font-bold capitalize tracking-wider text-textLight border-b border-r border-textMuted/20 last:border-r-0 bg-surfaceSoft shadow-[0_1px_0_0_rgba(var(--color-text-muted),0.1)]"
              >
                <div className="truncate">
                  {header?.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </div>

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
  );
};

export default GridHeader;
