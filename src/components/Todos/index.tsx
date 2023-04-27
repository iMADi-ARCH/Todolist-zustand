"use client";
import { useTodosStore } from "@/store";
import { FC, useEffect, useRef, useState } from "react";
import Todo from "./Todo";
import Button from "../ui/Button";
import {
    MdAdd,
    MdHelp,
    MdHelpOutline,
    MdSave,
    MdSettings,
} from "react-icons/md";
import AddTodoDialog from "./AddTodoDialog";
import { animated, useTrail, useTransition } from "@react-spring/web";
import useHotkeys from "./useHotkeys";
import KeyIcon from "../ui/KeyIcon";
import Help from "../Settings/Help";
import { useAuthContext } from "@/app/providers/AuthContextProvider";
import { getTodos } from "@/firebase/firestore/utils";
import Toast from "../ui/Toast";
import Settings from "../Settings";

interface TodosProps {}

const Todos: FC<TodosProps> = ({}) => {
    // const [todos, setTodos] = useState<ITodo[]>([]);

    const todos = useTodosStore((state) => state.todos);
    const setTodos = useTodosStore((state) => state.setAll);

    const [addTodoOpen, setAddTodoOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const { user } = useAuthContext();

    useEffect(() => {
        // if (logged in) and (no cache or last sign in was long ago) then fetch
        getTodos(user, todos).then((ts) => setTodos(ts));
    }, []);

    const scrollVertically = (value: number) => {
        window.scrollBy(0, value);
    };

    const key = useHotkeys([
        { key: "a", dispatch: setAddTodoOpen, value: true },
        { key: "j", dispatch: scrollVertically, value: 100 },
        { key: "k", dispatch: scrollVertically, value: -100 },
        { key: "/", dispatch: setSettingsOpen, value: !settingsOpen },
    ]);

    const [fadeFromLeft] = useTrail(
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

    const [fadeFromRight] = useTrail(
        3,
        {
            from: {
                opacity: 0,
                x: 100,
            },
            to: {
                opacity: 1,
                x: 0,
            },
        },
        []
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
            <h1 className="text-4xl font-black capitalize">
                {user && user.displayName
                    ? `${user?.displayName}'s Todos`
                    : `Your Todos`}
            </h1>

            {transitions((style, todo, tr, i) => (
                <div className="flex items-center w-full gap-2">
                    <animated.div style={fadeFromLeft[i]}>
                        <KeyIcon>{i + 1}</KeyIcon>
                    </animated.div>
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

            <div className="flex flex-col gap-5 fixed bottom-0 right-0 m-3">
                <animated.div style={fadeFromRight[0]}>
                    <Button
                        variant="secondary"
                        brightness="dim"
                        className="rounded-full aspect-square text-3xl p-3"
                        onClick={() => {
                            setSettingsOpen(true);
                        }}
                    >
                        <MdSettings />
                    </Button>
                </animated.div>
                <animated.div style={fadeFromRight[1]}>
                    <Button
                        className="rounded-full aspect-square text-3xl p-3 shadow-lg"
                        onClick={() => {
                            setAddTodoOpen(true);
                        }}
                    >
                        <MdAdd />
                    </Button>
                </animated.div>
            </div>

            <AddTodoDialog open={addTodoOpen} onOpenChange={setAddTodoOpen} />
            <Settings
                user={user}
                todos={todos}
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
            />
        </div>
    );
};

export default Todos;
