import { IconName, IconSize } from './icon.types';

export type ControlSize = 'sm' | 'md' | 'lg';
export type ControlRadius = 'md' | 'lg' | 'xl' | 'full';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'soft';
export type ButtonTone = 'primary' | 'neutral' | 'danger';

export type InputVariant = 'default' | 'filled';
export type InputTone = 'default' | 'danger' | 'success';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export type ButtonIconConfig = {
  name: IconName;
  size?: IconSize;
};

export type ComponentSize = 'small' | 'medium' | 'large' | 'xlarge';
export type ComponentTone = 'primary' | 'neutral' | 'danger' | 'success';
