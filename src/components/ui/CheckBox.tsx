import { FC } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

interface CheckBoxProps extends Toggle.ToggleProps {}

const CheckBox: FC<CheckBoxProps> = ({
    pressed,
    onPressedChange,
    ...props
}) => {
    return (
        <Toggle.Root
            className="outline-none text-3xl p-2 focus:ring ring-blue-500 rounded-md"
            pressed={pressed}
            onPressedChange={onPressedChange}
            {...props}
        >
            {pressed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </Toggle.Root>
    );
};

export default CheckBox;
