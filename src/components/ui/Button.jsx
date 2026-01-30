const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white",
    secondary:
      "bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border-light)] text-[var(--color-text-primary)]",
    danger: "bg-[var(--color-danger)] hover:bg-red-600 text-white",
    ghost:
      "bg-transparent hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]",
    outline:
      "bg-transparent border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-primary)]",
  };

  const sizes = {
    sm: "!px-4 !py-2 text-sm",
    md: "!px-6 !py-3 text-base",
    lg: "!px-8 !py-4 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
