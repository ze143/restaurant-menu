import { FiLoader } from "react-icons/fi";

const variants = {
  primary:
    "bg-gradient-to-l from-brand-gold to-yellow-600 text-brand-dark hover:scale-105 shadow-lg hover:shadow-brand-gold/40",
  secondary:
    "bg-white/5 border border-brand-gold/30 text-brand-gold hover:bg-brand-gold/10",
  danger:
    "bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500/25",
  ghost: "text-gray-400 hover:text-white hover:bg-white/5",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={loading || props.disabled}
      className={`inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && <FiLoader className="animate-spin" />}
      {children}
    </button>
  );
}