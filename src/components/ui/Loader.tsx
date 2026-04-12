import { ClipLoader } from 'react-spinners';
import { cn } from '@/lib/cn';

type LoaderProps = {
  size?: number;
  color?: string;
  label?: string;
  fullScreen?: boolean;
  className?: string;
};

export default function Loader({
  size = 28,
  color = 'var(--color-primary)',
  label = 'Loading...',
  fullScreen = false,
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullScreen ? 'h-screen w-full' : 'min-h-16 w-full',
        className,
      )}
    >
      <div className="flex flex-col items-center gap-3 text-textLight">
        <ClipLoader size={size} color={color} speedMultiplier={0.9} />
        {label ? <span className="text-sm font-medium">{label}</span> : null}
      </div>
    </div>
  );
}
