/* eslint-disable @typescript-eslint/no-explicit-any */
import { RowModel } from '@tanstack/react-table';
import GridRow from './Row';

interface GridBodyProps {
  rowModel: RowModel<any>;
  isEmpty: boolean;
}

const GridBody = ({ rowModel, isEmpty }: GridBodyProps) => {
  if (isEmpty) {
    return (
      <tbody className="bg-surface">
        <tr>
          <td colSpan={100} className="py-20 text-center text-textMuted italic text-sm">
            No records found.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className="divide-y divide-textMuted/10">
      {rowModel.rows.map((row) => (
        <GridRow key={row.id} row={row} />
      ))}
    </tbody>
  );
};

export default GridBody;
