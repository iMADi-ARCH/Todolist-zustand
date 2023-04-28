import { ChangeEventHandler, FC, InputHTMLAttributes } from "react";
import * as Label from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    labelText: string;
    inputText?: string;
    InputElement?: React.ReactNode;
}

const Field: FC<FieldProps> = ({
    labelText,
    id,
    InputElement,
    className,
    onChange,
    type,
    ...props
}) => {
    return (
        <fieldset className="flex flex-col justify-center">
            <Label.Root className="flex-1" htmlFor={id}>
                {labelText}
            </Label.Root>
            {InputElement ? (
                InputElement
            ) : type !== "textarea" ? (
                <>
                    <input
                        className={cn(
                            "flex-1 w-full outline-none bg-zinc-200 dark:bg-zinc-700 px-5 py-2 rounded-md",
                            className
                        )}
                        id={id}
                        name={id}
                        onChange={onChange}
                        type={type}
                        {...props}
                    />
                </>
            ) : (
                <textarea
                    className={cn(
                        "flex-1 w-full outline-none bg-zinc-200 dark:bg-zinc-700 px-5 py-2 rounded-md",
                        className
                    )}
                    name={id}
                    rows={5}
                    id={id}
                    onChange={
                        onChange as
                            | ChangeEventHandler<HTMLTextAreaElement>
                            | undefined
                    }
                ></textarea>
            )}
        </fieldset>
    );
};
export default Field;
