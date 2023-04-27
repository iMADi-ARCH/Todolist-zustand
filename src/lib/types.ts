import { Dispatch, SetStateAction } from "react";

export interface Todo {
    title: string;
    desc: string;
    done: boolean;
}

export interface HotKey<T> {
    key: KeyboardEvent["key"];
    dispatch: Dispatch<SetStateAction<T>> | ((value: T) => void);
    value?: T;
    shiftKey?: KeyboardEvent["shiftKey"];
    altKey?: KeyboardEvent["altKey"];
    ctrlKey?: KeyboardEvent["ctrlKey"];
}
