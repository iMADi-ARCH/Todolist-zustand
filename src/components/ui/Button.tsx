import { ButtonHTMLAttributes, FC } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ButtonVariants = cva(
    "px-5 py-2 text-sm font-medium rounded-md focus:ring ring-blue-400 outline-none flex items-center gap-2 disabled:opacity-50 transition-opacity",
    {
        variants: {
            variant: {
                primary:
                    "bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900",
                secondary: "text-zinc-900 dark:text-zinc-50 bg-transparent",
            },
            brightness: {
                dim: "opacity-50 hover:opacity-100 focus:opacity-100 transition-opacity shadow-none",
                default: "opacity-100",
            },
        },
        defaultVariants: {
            variant: "primary",
            brightness: "default",
        },
    }
);
export interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof ButtonVariants> {
    isLoading?: boolean;
}

const Button: FC<ButtonProps> = ({
    className,
    children,
    variant,
    brightness,
    ...props
}) => {
    return (
        <button
            className={cn(ButtonVariants({ variant, brightness, className }))}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
