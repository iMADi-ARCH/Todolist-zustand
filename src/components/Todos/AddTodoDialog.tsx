import { FC, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Field from "../ui/Field";
import Button from "../ui/Button";
import { useTodosStore } from "@/store";
import Modal from "../ui/Modal";

interface AddTodoDialogProps extends Dialog.DialogProps {}

const AddTodoDialog: FC<AddTodoDialogProps> = ({ ...props }) => {
    const addTodo = useTodosStore((state) => state.add);
    const [title, setTitle] = useState<string>("");
    const [desc, setDesc] = useState<string>("");

    const submit = () => {
        if (!props.onOpenChange || !props.open) return;
        console.log(title, desc);

        addTodo({ title: title, desc: desc, done: false });
        props.onOpenChange(!props.open);
        setDesc("");
        setTitle("");
        window.scrollTo(0, document.body.scrollHeight);
    };

    return (
        <Modal title="Add a todo" {...props}>
            <form
                action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                }}
                className="flex flex-col gap-4"
            >
                <Field
                    id="title"
                    onChange={(e) => {
                        setTitle(e.currentTarget.value);
                    }}
                    labelText="Title"
                />

                <Field
                    onChange={(e) => {
                        setDesc(e.currentTarget.value);
                    }}
                    id="desc"
                    labelText="Description"
                    type="textarea"
                />

                <Button
                    disabled={title === ""}
                    type="submit"
                    className="self-end px-10"
                >
                    Add
                </Button>
            </form>
        </Modal>
    );
};

export default AddTodoDialog;
