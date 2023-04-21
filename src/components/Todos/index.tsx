"use client";
import { useTodosStore } from "@/store";
import { FC, useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import Button from "../ui/Button";
import { MdAdd, MdHelp, MdHelpOutline } from "react-icons/md";
import AddTodoDialog from "./AddTodoDialog";
import { animated, useTrail, useTransition } from "@react-spring/web";
import useHotkeys from "./useHotkeys";
import KeyIcon from "../ui/KeyIcon";
import Help from "../Help";
import { Todo as ITodo } from "@/lib/types";

interface TodosProps {}

const Todos: FC<TodosProps> = ({}) => {
    const [todos, setTodos] = useState<ITodo[]>([]);
    const _todos = useTodosStore((state) => state.todos);
    const [addTodoOpen, setAddTodoOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);

    useEffect(() => {
        setTodos(_todos);
    }, [_todos]);

    const scrollVertically = (value: number) => {
        window.scrollBy(0, value);
    };

    const key = useHotkeys([
        { key: "a", dispatch: setAddTodoOpen, value: true },
        { key: "j", dispatch: scrollVertically, value: 100 },
        { key: "k", dispatch: scrollVertically, value: -100 },
        { key: "/", dispatch: setHelpOpen, value: !helpOpen },
        // { key: "j", dispatch: scrollVertically, value: 500, shiftKey: true },
    ]);

    const [springs] = useTrail(
        todos.length,
        {
            from: {
                opacity: 0,
                x: -100,
            },
            to: {
                opacity: 1,
                x: 0,
            },
        },
        [todos]
    );

    const transitions = useTransition(todos, {
        from: { opacity: 0, x: -100 },
        enter: { opacity: 1, x: 0 },
        leave: { opacity: 0, x: 100 },
        trail: 50,
        config: {
            bounce: 10,
        },
    });

    return (
        <div className="h-full w-full max-w-md flex flex-col items-center justify-center gap-5">
            <h1 className="text-4xl font-black">Your Todos</h1>

            {transitions((style, todo, tr, i) => (
                <div className="flex items-center w-full gap-2">
                    <KeyIcon>{i + 1}</KeyIcon>
                    <animated.div
                        className="w-full flex-1"
                        style={style}
                        key={i}
                    >
                        <Todo index={i} key={i} todo={todo} />
                    </animated.div>
                </div>
            ))}

            {/* {springs.map((style, i) => {
                const todo = todos[i];
                return (
                    <animated.div
                        className="inline-block w-full max-w-sm"
                        style={style}
                        key={i}
                    >
                        <Todo index={i} key={i} todo={todo} />
                    </animated.div>
                );
            })} */}

            {todos.length <= 0 ? (
                <span className="text-xs opacity-50">
                    Press A to add a todo
                </span>
            ) : null}

            <div className="flex flex-col gap-5 fixed bottom-0 right-0 m-10">
                <Button
                    variant="secondary"
                    className="rounded-full aspect-square text-3xl p-3 shadow-lg"
                    onClick={() => {
                        setHelpOpen(true);
                    }}
                >
                    <MdHelpOutline />
                </Button>
                <Button
                    className="rounded-full aspect-square text-3xl p-3 shadow-lg"
                    onClick={() => {
                        setAddTodoOpen(true);
                    }}
                >
                    <MdAdd />
                </Button>
            </div>

            <AddTodoDialog open={addTodoOpen} onOpenChange={setAddTodoOpen} />
            <Help open={helpOpen} onOpenChange={setHelpOpen} />
        </div>
    );
};

export default Todos;
