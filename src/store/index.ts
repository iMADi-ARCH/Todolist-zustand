import { saveTodosToFirestore } from "@/firebase/firestore/utils";
import { HotKey, Todo } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodosStore {
    todos: Todo[];
    setAll: (todos: Todo[]) => void;
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
    // persist(
    (set) => ({
        todos: [],
        setAll: (todos) =>
            set((state) => {
                return { todos };
            }),
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
    })
    // { name: "todosStore" }
    // )
);

// interface HotkeysStore {
//     hotkeys: HotKey<any>[];
//     addHotkey: (hotkey: HotKey<any>) => void;
// }

// export const useHotkeysStore = create<HotkeysStore>()(
//     persist(
//         (set) => ({
//             hotkeys: [],
//             addHotkey: (hotkey) =>
//                 set((state) => {
//                     return { hotkeys: [...state.hotkeys, hotkey] };
//                 }),
//         }),
//         { name: "hotkeysStore" }
//     )
// );
