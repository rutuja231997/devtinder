import { useState } from "react";

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  required = false,
  rightSlot,
}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;
  const id = `field-${name}`;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-[#CBD5E1]">
          {label}
        </label>
        {rightSlot}
      </div>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-12 w-full rounded-xl bg-[#0A0F1F] px-4 ${
            isPassword ? "pr-12" : ""
          } text-[15px] text-[#F8FAFC] placeholder:text-[#64748B] border transition-all duration-200 outline-none ${
            error
              ? "border-[#EF4444]/50 focus:border-[#EF4444] focus:ring-2 focus:ring-[#EF4444]/20"
              : "border-white/10 hover:border-white/20 focus:border-[#4F8CFF] focus:ring-2 focus:ring-[#4F8CFF]/20"
          }`}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-[#94A3B8] transition-colors duration-200 hover:text-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4F8CFF]/40"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="text-xs text-[#F87171]">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;
