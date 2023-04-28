"use client";
import { FC, useState } from "react";
import Field, { FieldProps } from "./Field";
import { MdPassword } from "react-icons/md";
import CheckBox from "./CheckBox";

interface PasswordFieldProps extends FieldProps {}

const PasswordField: FC<PasswordFieldProps> = ({ ...props }) => {
    const [type, setType] = useState<"password" | "text">("password");
    return (
        <div className="relative">
            <Field {...props} type={type} />
            {/* <MdPassword className="absolute right-0 top-1/2 -translate-y-1/2" /> */}
            <CheckBox />
        </div>
    );
};

export default PasswordField;
