import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  label: string;
  customClasses?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  label,
  customClasses,
  ...props
}) => {
  const defaultClasses = `bg-stone-700 text-white border-stone-500 hover:bg-stone-500 focus:ring focus:ring-blue-200 ${customClasses}`;
  const outlineClasses = `text-stone-100 border-stone-600 border-solid bg-transparent hover:bg-stone-600 focus:ring focus:ring-blue-200  ${customClasses}`;

  const classes = variant === 'outline' ? outlineClasses : defaultClasses;

  return (
    <button
      {...props}
      className={`px-4 py-2 rounded border transition duration-150 ease-in-out ${classes} ${customClasses}`}
    >
      {label}
    </button>
  );
};

export default Button;
