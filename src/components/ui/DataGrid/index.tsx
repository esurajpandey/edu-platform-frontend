import { useMemo } from 'react';
import { GridProps } from './type';
import { getColumnDef, getTransformData } from './config';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import Header from './header';
import Body from './body';

const DataGrid = ({ header = [], dataset = [], isLoading = false }: GridProps) => {
  const columns = useMemo(() => getColumnDef(header), [header]);
  const data = useMemo(() => getTransformData(dataset), [dataset]);

  const table = useReactTable({
    data,
    columns,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
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
      </div>
    </div>
  );
};

export default DataGrid;
