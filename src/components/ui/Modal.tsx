import { FC } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Button from "./Button";
import { MdClose } from "react-icons/md";

interface ModalProps extends Dialog.DialogProps {
    title: string;
    desc?: string;
}

const Modal: FC<ModalProps> = ({ title, desc, children, ...props }) => {
    return (
        <Dialog.Root {...props}>
            <Dialog.Portal>
                <Dialog.Overlay className="data-[state=open]:animate-overlayShow bg-zinc-900/50 fixed inset-0" />
                <Dialog.Content className="flex flex-col data-[state=open]:animate-contentShow fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md bg-zinc-50 dark:bg-zinc-800 p-10 shadow-lg focus:outline-none">
                    <Dialog.Title className="text-2xl font-semibold mb-5">
                        {title}
                    </Dialog.Title>
                    <Dialog.Description>{desc}</Dialog.Description>

                    {children}

                    <Dialog.Trigger className="absolute top-0 right-0 p-4 text-lg">
                        {/* <Button className="p-4" variant="secondary"> */}
                        <MdClose />
                        {/* </Button> */}
                    </Dialog.Trigger>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
