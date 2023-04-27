import { FC } from "react";
import * as Switch from "@radix-ui/react-switch";
import Field from "./Field";
import { Label } from "@radix-ui/react-label";
interface SwitchProps extends Switch.SwitchProps {
    labelText: string;
    id: string;
}

export default ({ labelText, id, ...props }: SwitchProps) => {
    return (
        <fieldset className="flex my-2">
            <Label className="flex-1" id={id} htmlFor={id}>
                {labelText}
            </Label>
            <Switch.Root
                id={id}
                {...props}
                className="relative rounded-full bg-zinc-100 border-2 border-zinc-500 w-[56px] h-[32px] flex items-center justify-center outline-none"
            >
                <Switch.Thumb className="block w-[24px] h-[24px] rounded-full bg-zinc-900 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=unchecked]:-translate-x-1/2 data-[state=checked]:translate-x-1/2" />
            </Switch.Root>
        </fieldset>
    );
};
