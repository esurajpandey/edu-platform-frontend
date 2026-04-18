import { useMemo, useState } from 'react';
import { GridProps } from './type';
import { getColumnDef, getTransformData, getPageSizeOptions } from './config';
import { SelectInput, Icon } from '@/components/ui';
import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import Header from './header';
import Body from './body';

const DataGrid = ({ header = [], dataset = [], isLoading = false }: GridProps) => {
  const columns = useMemo(() => getColumnDef(header), [header]);
  const data = useMemo(() => getTransformData(dataset), [dataset]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const pageSizeOption = getPageSizeOptions();
  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="p-10 text-center text-textMuted font-medium animate-pulse">Loading...</div>
    );
  }

  return (
    <div className="w-full h-full bg-base">
      <div className="h-full flex flex-col overflow-hidden border border-textMuted/30 rounded-md shadow-sm bg-surface">
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
            <Header headerGroups={table.getHeaderGroups()} />
            <Body rowModel={table.getRowModel()} isEmpty={data.length === 0} />
          </table>
        </div>
        <div className="p-2 border-t flex items-center justify-end gap-1 bg-surfaceSoft/10">
          <span className="text-xs text-textMuted mr-2">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <div
            className={`p-1 h-8 border border-textMuted/30 rounded-[4px] bg-surface flex items-center justify-center hover:bg-primary/10 ${table.getCanPreviousPage() ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => table.previousPage()}
          >
            <Icon name="chevronLeft" size="small" />
          </div>
          <div style={{ width: '80px' }}>
            <SelectInput
              value={table.getState().pagination.pageSize}
              options={pageSizeOption}
              clearable={false}
              size="small"
              onChange={(value) => table.setPageSize(Number(value))}
            />
          </div>
          <div
            className={`p-1 h-8 border border-textMuted/30 rounded-[4px] bg-surface flex items-center justify-center  hover:bg-primary/10 ${table.getCanNextPage() ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
            onClick={() => table.nextPage()}
          >
            <Icon name="chevronRight" size="small" color="surfaceSoft" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataGrid;
