import { cn } from "@/lib/utils";
import { FC, HTMLAttributes } from "react";

interface KeyIconProps extends HTMLAttributes<HTMLSpanElement> {
    key?: string | number;
}

const KeyIcon: FC<KeyIconProps> = ({ children, className, ...props }) => {
    return (
        <span
            className={cn(
                "rounded-md border p-2 border-b-8 leading-3 select-none aspect-square border-zinc-900 dark:border-zinc-50 active:border-b",
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
};

export default KeyIcon;
