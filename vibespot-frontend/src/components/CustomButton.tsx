import type { ButtonHTMLAttributes, ReactNode } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface CustomButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  variant?: "primary" | "danger" | "outline";
}

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",

  danger:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
};

const CustomButton = ({
  children,
  loading = false,
  fullWidth = true,
  variant = "primary",
  className = "",
  disabled,
  ...props
}: CustomButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-2xl
        px-6
        py-3
        text-base
        font-semibold
        transition-all
        duration-200
        focus:outline-none
        focus:ring-4
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-60
        shadow-sm
        hover:shadow-md
        ${variantClasses[variant]}
        ${fullWidth ? "w-full" : "w-auto"}
        ${className}
      `}
    >
      {loading && <LoadingSpinner size="sm" />}

      <span>{children}</span>
    </button>
  );
};

export default CustomButton;