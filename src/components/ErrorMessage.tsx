import ErrorIcon from '@mui/icons-material/Error';
const ErrorMessage: React.FC<{ message: string; customClasses?: string }> = ({
  message,
  customClasses,
}) => {
  const classes = `flex items-center space-x-2 text-red-600 bg-red-100 p-3 rounded ${customClasses} `;

  return (
    <div className={classes}>
      <ErrorIcon className="text-red-600" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
