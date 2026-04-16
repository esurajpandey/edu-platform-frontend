import { ControlRadius } from '@/types';

export const sizeClasses = {
  small: 'px-2 py-1 text-sm h-8',
  medium: 'px-3 py-2 text-sm h-10',
  large: 'px-4 py-3 text-md h-12',
  xlarge: 'px-4 py-3 text-lg h-12',
};

export const controlRadiusClasses: Record<ControlRadius, string> = {
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-[20px]',
  full: 'rounded-full',
};
