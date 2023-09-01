import { Jelly, LineWobble } from '@uiball/loaders';

interface LoadingSpinnerProps {
  className?: string;
  color?: string;
  size?: number | 'fullscreen';
  variant?: 'linear' | 'blob';
}
const LoadingSpinner = ({
  className,
  color = '#fff',
  size,
  variant,
}: LoadingSpinnerProps) => {
  const extendedClasses = `spinner-border text-slate-100 flex justify-center ${className}`;

  const getSize = (
    val: number | 'fullscreen' | undefined,
  ): number | undefined =>
    val === 'fullscreen' ? window.innerWidth / 10 : val;

  const returnLoader = (variant?: 'linear' | 'blob') => {
    switch (variant) {
      case 'linear':
        return <LineWobble size={getSize(size)} color={color} />;
      case 'blob':
        return <Jelly size={getSize(size)} color={color} />;
      default:
        return <Jelly size={getSize(size)} color={color} />;
    }
  };

  return (
    <div>
      <div className={extendedClasses} role="status">
        <span className="sr-only">Loading...</span>
        {returnLoader(variant)}
      </div>
    </div>
  );
};

export default LoadingSpinner;
