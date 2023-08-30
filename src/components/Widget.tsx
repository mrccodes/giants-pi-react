import LoadingSpinner from './LoadingSpinner';

interface WidgetProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  loading?: boolean;
}
const Widget = ({ children, className, loading }: WidgetProps) => {
  return loading ? (
    <LoadingSpinner className="mx-auto my-0 h-full w-auto" />
  ) : (
    <div
      className={
        className ??
        'border border-solid border-slate-100 px-4 py-3 rounded-md h-full text-slate-100'
      }
    >
      {children}
    </div>
  );
};

export default Widget;
