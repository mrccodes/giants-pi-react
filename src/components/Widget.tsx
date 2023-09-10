import LoadingSpinner from './LoadingSpinner';

interface WidgetProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  loading?: boolean;
  borderColor?: 'border-red-600' | 'border-green-600';
}
const Widget = ({
  children,
  loading,
  borderColor,
  className,
  ...rest
}: WidgetProps) => {
  const classes =
    `border border-solid ${
      borderColor ?? 'border-slate-100'
    } px-4 py-3 rounded-md h-full text-slate-100 ` + className ?? '';

  return loading ? (
    <div {...rest} className={`${classes} flex justify-center items-center`}>
      <LoadingSpinner variant="linear" className="mx-auto my-0 h-full w-auto" />
    </div>
  ) : (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default Widget;
