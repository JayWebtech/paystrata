import React from 'react';

interface InputFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  networkLogo?: string | null;
  max?: number;
  min?: number;
  name?: string;
  disabled?: boolean;
  helperText?: string;
  error?: string;
}

/**
 * InputField Component
 * Modern styled input with support for network logo display
 * Features glass morphism design and focus states
 */
export default function InputField({
  id,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  label,
  required = false,
  networkLogo,
  max,
  min,
  name,
  disabled = false,
  helperText,
  error,
}: InputFieldProps) {
  return (
    <div className="mb-4">
      {/* Label */}
      {label && (
        <label 
          htmlFor={id} 
          className="block text-text-secondary text-sm font-medium mb-2"
        >
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Network Logo - Shows detected provider */}
        {networkLogo && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
            <img
              src={networkLogo}
              alt="Network"
              className="w-8 h-8 rounded-lg object-cover"
            />
          </div>
        )}
        
        {/* Input */}
        <input
          name={name}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          maxLength={max}
          disabled={disabled}
          className={`
            w-full px-4 py-3.5 rounded-xl
            border transition-all duration-200
            text-white text-sm
            placeholder:text-text-muted
            focus:outline-none
            focus-visible:outline-none
            focus-visible:ring-0
            focus-visible:ring-offset-0
            focus-visible:shadow-none
            focus:ring-0
            focus:ring-offset-0
            focus:shadow-none
            ${error 
              ? 'border-error focus:border-error focus-visible:border-error' 
              : 'border-surface-border hover:border-primary/30 focus:border-primary focus-visible:border-primary'
            }
            ${networkLogo ? 'pr-14' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-dark-elevated/30' : ''}
          `}
        />
      </div>

      {/* Helper/Error Text */}
      {(helperText || error) && (
        <p className={`mt-2 text-xs ${error ? 'text-error' : 'text-text-muted'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
