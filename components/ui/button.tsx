import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-titanium hover:bg-accent-soft shadow-[0_10px_40px_-12px_rgb(var(--accent)/0.7)] border border-accent",
  outline: "border border-bone/20 text-bone hover:border-accent hover:text-accent bg-transparent",
  ghost: "text-bone/80 hover:text-bone hover:bg-bone/5",
};
const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-sm",
};

/** Shadcn-style button primitive, restyled with APEX tokens. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", size = "md", ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "group inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-titanium disabled:pointer-events-none disabled:opacity-40",
      variants[variant],
      sizes[size],
      className,
    )}
    {...props}
  />
));
Button.displayName = "Button";
