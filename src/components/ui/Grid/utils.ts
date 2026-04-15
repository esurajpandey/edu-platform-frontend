import { format, isValid, parseISO } from 'date-fns';
import type { GridColumnType } from './grid.type';

export function resolveGridAlignment(align?: 'left' | 'center' | 'right', type?: GridColumnType) {
  if (align) {
    return align;
  }

  if (type === 'number') {
    return 'right';
  }

  if (type === 'select' || type === 'date') {
    return 'center';
  }

  return 'left';
}

export function getAlignmentClassName(align: 'left' | 'center' | 'right' = 'left', header = false) {
  if (align === 'center') {
    return header ? 'justify-center text-center' : 'justify-center text-center';
  }

  if (align === 'right') {
    return header ? 'justify-end text-right' : 'justify-end text-right';
  }

  return header ? 'justify-start text-left' : 'justify-start text-left';
}

export function formatCellValue(value: unknown, type?: GridColumnType) {
  if (value === null || value === undefined || value === '') {
    return '—';
  }

  if (type === 'date' && typeof value === 'string') {
    const parsed = parseISO(value);
    if (isValid(parsed)) {
      return format(parsed, 'dd MMM yyyy');
    }
  }

  return String(value);
}
