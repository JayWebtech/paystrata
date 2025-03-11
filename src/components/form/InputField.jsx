export default function InputField({
    id,
    value,
    onChange,
    type = "text",
    placeholder = "",
    label,
    required = false,
    networkLogo,
    max,
  }) {
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
          <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="appearance-none text-white ring-[1px] ring-primary rounded-lg w-full py-3 px-4 text-background leading-tight focus:outline-none focus:ring-2 focus:ring-primary transition-all bg-transparent pr-12"
            required={required}
            maxLength={max}
          />
          
        </div>
      </div>
    );
  }
  