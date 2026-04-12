import { ControlRadius, ControlSize } from '@/types';

export const controlSizeClasses: Record<ControlSize, string> = {
  sm: 'min-h-10 px-3.5 text-sm',
  md: 'min-h-11 px-4 text-sm',
  lg: 'min-h-12 px-5 text-base',
};

export const controlRadiusClasses: Record<ControlRadius, string> = {
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-[20px]',
  full: 'rounded-full',
};
