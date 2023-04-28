"use client";
import { Todo } from "@/lib/types";
import { useTodosStore } from "@/store";
import { FC, useState } from "react";
import { MdClose } from "react-icons/md";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import CheckBox from "../ui/CheckBox";
import { animated, useSpring } from "@react-spring/web";
import useHotkeys from "./useHotkeys";

interface TodoProps {
    todo: Todo;
    index: number;
}

const Todo: FC<TodoProps> = ({ todo, index, ...props }) => {
    const { title, desc, done } = todo;
    // const edit = useTodosStore((state) => state.edit);
    const remove = useTodosStore((state) => state.remove);
    const toggleDone = useTodosStore((state) => state.toggleDone);
    const [isOpen, setIsOpen] = useState<boolean>();
    const key = useHotkeys([
        {
            key: (index + 1).toString(),
            dispatch: toggleDone,
            value: index,
        },
        {
            key: (index + 1).toString(),
            dispatch: remove,
            value: index,
            ctrlKey: true,
        },
    ]);

    const [springs] = useSpring(
        {
            to: {
                opacity: done ? 0.5 : 1,
                scale: done ? 0.95 : 1,
            },
        },
        [done]
    );

    return (
        <animated.div
            style={springs}
            {...props}
            className="flex items-center justify-between relative max-w-sm w-full bg-zinc-200 dark:bg-zinc-800 pr-10 rounded-md cursor-pointer"
        >
            <h2
                onClick={() => {
                    setIsOpen(true);
                }}
                className="text-xl p-10 capitalize flex-1 w-full"
            >
                {title}
            </h2>
            <span className="text-xl">
                <CheckBox
                    tabIndex={index + 1}
                    pressed={done}
                    onPressedChange={() => {
                        toggleDone(index);
                    }}
                />
            </span>

            <Button
                onClick={() => {
                    remove(index);
                }}
                variant="secondary"
                className="absolute top-0 right-0 p-3"
            >
                <MdClose />
            </Button>

            <Modal
                title={title}
                desc={desc}
                open={isOpen}
                onOpenChange={setIsOpen}
            ></Modal>
        </animated.div>
    );
};

export default Todo;
