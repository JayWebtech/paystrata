import React from 'react';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'outline' | 'ghost';
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
}

/**
 * Button Component
 * Modern crypto-style button with multiple variants
 * Features gradient backgrounds, glow effects, and smooth transitions
 */
const Button: React.FC<ButtonProps> = ({
  onClick,
  size = 'md',
  variant = 'primary',
  className = '',
  children,
  disabled = false,
  isLoading = false,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  // Variant classes
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-primary to-[#00B894]
      text-dark font-semibold
      hover:from-primary-light hover:to-primary
      active:scale-[0.98]
    `,
    outline: `
      bg-transparent
      border border-primary/50
      text-primary
      hover:bg-primary/10
      hover:border-primary
      hover:shadow-[0_0_20px_rgba(0,212,170,0.15)]
    `,
    ghost: `
      bg-transparent
      text-text-secondary
      hover:text-white
      hover:bg-white/5
    `,
  };

  return (
    <button
      className={`
        relative rounded-xl font-inter font-medium
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
