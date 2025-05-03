import React from 'react';

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
}

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
}: SelectFieldProps) {
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

  const getValue = () => {
    if (type === 'dataplan' && typeof value === 'object') {
      return (value as DataPlanValue).PRODUCT_ID;
    } else if (type === 'TV' && typeof value === 'object') {
      return (value as TVValue).PACKAGE_ID;
    }
    return value as string;
  };

  return (
    <div className="relative mb-4">
      {label && (
        <label htmlFor={id} className="block text-white text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {networkLogo && (
          <img
            src={networkLogo}
            alt="Network Logo"
            className="absolute right-1.5 top-1/2 transform rounded-md -translate-y-1/2 w-8 h-8"
          />
        )}
        <select
          id={id}
          value={getValue()}
          onChange={handleChange}
          className={`appearance-none text-white ring-2 ring-primary rounded-lg w-full py-3 px-4 text-background leading-tight focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-transparent ${
            networkLogo ? 'pr-12' : ''
          }`}
          required={required}
          disabled={disabled}
        >
          <option value="" disabled>
            Select an option
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
            >
              {type === 'dataplan' ? (
                <>
                  {option.PRODUCT_NAME} - ₦{Math.ceil(option.PRODUCT_AMOUNT)}
                </>
              ) : type === 'electric' ? (
                <>{option.name}</>
              ) : (
                <>{option.PACKAGE_NAME}</>
              )}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
