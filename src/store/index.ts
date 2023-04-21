import { Todo } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodosStore {
    todos: Todo[];
    add: (todo: Exclude<Todo, "index">) => void;
    remove: (index: number) => void;
    edit: (
        index: number,
        key: Exclude<keyof Todo, "index">,
        value: string
    ) => void;
    toggleDone: (index: number) => void;
}

export const useTodosStore = create<TodosStore>()(
    persist(
        (set) => ({
            todos: [],
            add: (todo) =>
                set((state) => {
                    return { todos: [...state.todos, todo] };
                }),
            remove: (index) =>
                set((state) => {
                    const todos = [...state.todos];
                    todos.splice(index, 1);
                    return { todos };
                }),
            edit: (index, key, value) =>
                set((state) => {
                    const todos = [...state.todos];
                    todos[index] = { ...todos[index], [key]: value };
                    return { todos };
                }),
            toggleDone: (index) =>
                set((state) => {
                    const todos = [...state.todos];
                    todos[index].done = !todos[index].done;
                    return { todos };
                }),
        }),
        { name: "todosStore" }
    )
);
