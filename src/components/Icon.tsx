import { CSSProperties, SVGProps } from 'react';
import { icons } from '@/assets/icons';
import { IconColor, IconName, IconSize } from '@/types';

type IconProps = Omit<SVGProps<SVGSVGElement>, 'color'> & {
  name: IconName;
  size?: IconSize;
  color?: IconColor;
};

const iconSizes: Record<IconSize, number> = {
  tiny: 12,
  small: 16,
  medium: 20,
  large: 24,
};

const iconColors: Record<IconColor, string> = {
  primary: 'var(--color-primary)',
  primaryDark: 'var(--color-primaryDark)',
  primaryLight: 'var(--color-primaryLight)',
  base: 'var(--color-base)',
  surface: 'var(--color-surface)',
  surfaceSoft: 'var(--color-surfaceSoft)',
  text: 'var(--color-text)',
  textLight: 'var(--color-textLight)',
  textMuted: 'var(--color-textMuted)',
  danger: 'var(--color-danger)',
};

export default function Icon({
  name,
  size = 'medium',
  color = 'text',
  style,
  ...props
}: IconProps) {
  const SvgIcon = icons[name];
  const iconStyle: CSSProperties = {
    width: iconSizes[size],
    height: iconSizes[size],
    color: iconColors[color],
    flexShrink: 0,
    ...style,
  };

  return (
    <SvgIcon aria-hidden={props['aria-label'] ? undefined : true} style={iconStyle} {...props} />
  );
}
