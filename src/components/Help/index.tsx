"use client";
import { FC } from "react";
import Modal from "../ui/Modal";
import { DialogProps } from "@radix-ui/react-dialog";
import KeyIcon from "../ui/KeyIcon";

interface HelpProps extends DialogProps {}

const Help: FC<HelpProps> = ({ open, onOpenChange, ...props }) => {
    // const hotkeys = useHotkeysStore((state) => state.hotkeys);

    const onetonine = [];
    for (let i = 1; i < 10; i++) {
        onetonine.push(i);
    }

    return (
        <Modal open={open} onOpenChange={onOpenChange} {...props} title="Help">
            <div className="py-5 flex flex-col gap-10">
                <div className="flex flex-col gap-1 leading-5">
                    <h2 className="text-lg font-semibold">
                        Add and remove todos
                    </h2>
                    <p>
                        Press <KeyIcon>A</KeyIcon> to add a todo
                    </p>
                    <li className="list-none">
                        Press the number keys to mark todos as done or not done
                    </li>
                    <li className="list-none">
                        and hold <KeyIcon>Ctrl</KeyIcon> while pressing the
                        number keys
                        {onetonine.map((n) => (
                            <KeyIcon className="mx-1">{n}</KeyIcon>
                        ))}
                        to delete the corresponding todo
                    </li>
                    <div className="inline-block"></div>
                </div>
                <div className="flex flex-col gap-3 leading-5">
                    <h2 className="text-lg font-semibold">Movement</h2>
                    <p>
                        Press <KeyIcon>J</KeyIcon> to scroll down and
                        <KeyIcon>K</KeyIcon> to scroll up
                    </p>
                </div>
            </div>
        </Modal>
    );
};

export default Help;
