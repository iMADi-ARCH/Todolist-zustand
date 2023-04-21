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
                <Dialog.Overlay className="data-[state=open]:animate-overlayShow bg-zinc-900/50 fixed grid place-items-center inset-0 overflow-y-auto">
                    <Dialog.Content className="my-5 relative flex flex-col data-[state=open]:animate-contentShow w-[90vw] max-w-lg  rounded-md bg-zinc-50 dark:bg-zinc-800 p-10 shadow-lg focus:outline-none">
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
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

export default Modal;
