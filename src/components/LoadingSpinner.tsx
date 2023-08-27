import { Jelly } from "@uiball/loaders";

interface LoadingSpinnerProps {
    className?: string;
    color?: string;
    size?: number | 'fullscreen'; 
}
const LoadingSpinner = ({ className, color = '#fff', size }: LoadingSpinnerProps) => {
  const extendedClasses = `spinner-border text-slate-100 flex justify-center ${className}`

  const getSize = (val: number | 'fullscreen' | undefined): number | undefined => 
    val === 'fullscreen' ? window.innerWidth / 10 : val;
  

  return (
    <div>
      <div className={extendedClasses} role="status">
        <span className="sr-only">Loading...</span>
        <Jelly size={getSize(size)} color={color}/>
      </div>
    </div>
  );
};

export default LoadingSpinner;
