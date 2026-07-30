import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import {
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

interface CustomInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  leftIcon?: ReactNode;
}

const CustomInput = forwardRef<
  HTMLInputElement,
  CustomInputProps
>(
  (
    {
      label,
      error,
      leftIcon,
      type = "text",
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] =
      useState(false);

    const isPassword = type === "password";

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>

        <div
          className={`
            flex
            items-center
            rounded-2xl
            border
            bg-white
            transition-all
            duration-200
            ${
              error
                ? "border-red-500 ring-2 ring-red-100"
                : "border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100"
            }
            ${
              disabled
                ? "cursor-not-allowed bg-slate-100 opacity-70"
                : ""
            }
          `}
        >
          {leftIcon && (
            <div className="pl-4 text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={
              isPassword
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            disabled={disabled}
            className={`
              h-12
              w-full
              bg-transparent
              px-4
              text-slate-900
              placeholder:text-slate-400
              focus:outline-none
              ${className}
            `}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="pr-4 text-slate-400 transition hover:text-slate-700"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;