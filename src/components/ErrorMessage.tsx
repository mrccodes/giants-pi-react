import ErrorIcon from '@mui/icons-material/Error';
import React from 'react';

interface ErrorMessageProps extends React.HTMLProps<HTMLDivElement> {
  message: string;
  warn?: boolean;
}

/**
 * ErrorMessage Component
 *
 * Used to render an error div complete with error icon and error message, styled red-n-scary
 * - or you can pass warn=true for yellow-n-less-scary
 */
const ErrorMessage = ({
  message,
  warn,
  className,
  ...rest
}: ErrorMessageProps) => {
  const colors = warn
    ? 'text-yellow-600 bg-yellow-100'
    : 'text-red-600 bg-red-100';
  return (
    <div
      {...rest}
      className={`flex items-center space-x-2 p-3 rounded ${colors} ${className}`}
    >
      <ErrorIcon className="text-inherit" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;
