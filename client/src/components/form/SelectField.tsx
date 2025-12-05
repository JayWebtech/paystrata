import React from 'react';
import { ChevronDown } from 'lucide-react';

interface Option {
  PRODUCT_ID?: string;
  PRODUCT_NAME?: string;
  PRODUCT_AMOUNT?: number;
  code?: string;
  name?: string;
  PRODUCT_CODE?: string;
  PACKAGE_ID?: string;
  PACKAGE_NAME?: string;
}

interface DataPlanValue {
  PRODUCT_ID: string;
  PRODUCT_AMOUNT: number;
}

interface TVValue {
  PACKAGE_ID: string;
  PACKAGE_AMOUNT: number;
}

interface SelectFieldProps {
  id: string;
  value: string | DataPlanValue | TVValue;
  onChange: (value: string | DataPlanValue | TVValue) => void;
  options: any[];
  label?: string;
  required?: boolean;
  networkLogo?: string;
  disabled?: boolean;
  type?: 'dataplan' | 'electric' | 'betting' | 'cable' | 'TV';
  placeholder?: string;
}

/**
 * SelectField Component
 * Custom styled select dropdown for plans and providers
 * Supports multiple data types (data plans, TV plans, electricity)
 */
export default function SelectField({
  id,
  value,
  onChange,
  options = [],
  label,
  required = false,
  networkLogo,
  disabled,
  type = 'dataplan',
  placeholder = 'Select an option',
}: SelectFieldProps) {
  // Handle change for different value types
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (type === 'dataplan') {
      const selectedOption = options.find(opt => opt.PRODUCT_ID === e.target.value);
      if (selectedOption) {
        onChange({
          PRODUCT_ID: selectedOption.PRODUCT_ID,
          PRODUCT_AMOUNT: selectedOption.PRODUCT_AMOUNT
        });
      }
    } else if (type === 'TV') {
      const selectedOption = options.find(opt => opt.PACKAGE_ID === e.target.value);
      if (selectedOption) {
        onChange({
          PACKAGE_ID: selectedOption.PACKAGE_ID,
          PACKAGE_AMOUNT: selectedOption.PACKAGE_AMOUNT,
        });
      }
    } else {
      onChange(e.target.value);
    }
  };

  // Get current value based on type
  const getValue = () => {
    if (type === 'dataplan' && typeof value === 'object') {
      return (value as DataPlanValue).PRODUCT_ID;
    } else if (type === 'TV' && typeof value === 'object') {
      return (value as TVValue).PACKAGE_ID;
    }
    return value as string;
  };

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
      
      {/* Select Container */}
      <div className="relative">
        {/* Network Logo */}
        {networkLogo && (
          <div className="absolute right-12 top-1/2 -translate-y-1/2 z-10">
            <img
              src={networkLogo}
              alt="Network"
              className="w-7 h-7 rounded-md object-cover"
            />
          </div>
        )}
        
        {/* Select */}
        <select
          id={id}
          value={getValue()}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className={`
            w-full px-4 py-3.5 rounded-xl
            border border-surface-border
            text-white text-sm
            appearance-none cursor-pointer
            transition-all duration-200
            hover:border-primary/30
            focus:outline-none focus:border-primary
            disabled:opacity-50 disabled:cursor-not-allowed
            ${networkLogo ? 'pr-20' : 'pr-12'}
          `}
        >
          <option value="" disabled className="bg-dark-card text-text-muted">
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option
              key={index}
              value={
                type === 'dataplan'
                  ? option.PRODUCT_ID
                  : type === 'electric'
                    ? option.code
                    : option.PACKAGE_ID
              }
              className="bg-dark-card text-white py-2"
            >
              {type === 'dataplan' ? (
                `${option.PRODUCT_NAME} - ₦${Math.ceil(option.PRODUCT_AMOUNT)}`
              ) : type === 'electric' ? (
                option.name
              ) : (
                option.PACKAGE_NAME
              )}
            </option>
          ))}
        </select>
        
        {/* Custom Dropdown Arrow */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <ChevronDown className="w-5 h-5 text-text-muted" />
        </div>
      </div>
    </div>
  );
}
