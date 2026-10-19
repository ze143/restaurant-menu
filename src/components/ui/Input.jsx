import { forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, error, hint, className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-gray-400 mb-1.5">
          {label}
          {props.required && <span className="text-red-400 mr-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        className={`input-field ${error ? "border-red-500/50" : ""} ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
});

export default Input;