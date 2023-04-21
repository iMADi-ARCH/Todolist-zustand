import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";

export interface ShortcutKey<T> {
    key: KeyboardEvent["key"];
    dispatch: Dispatch<SetStateAction<T>> | ((value: T) => void);
    value: T;
    shiftKey?: KeyboardEvent["shiftKey"];
    altKey?: KeyboardEvent["altKey"];
    ctrlKey?: KeyboardEvent["ctrlKey"];
}

export default function useShortcuts(shortcuts: ShortcutKey<any>[]) {
    const [key, setKey] = useState<KeyboardEvent["key"] | null>(null);

    const handleShortcut = useCallback(
        (e: KeyboardEvent, short: ShortcutKey<any>) => {
            if (
                (short.shiftKey && !e.shiftKey) ||
                (short.altKey && !e.altKey) ||
                (short.ctrlKey && !e.ctrlKey)
            ) {
                // One of the keys in the combination is not pressed
                return;
            }

            if (short.key === e.key) {
                e.preventDefault();
                // All keys in the combination are pressed simultaneously
                short.dispatch(short.value);
            }
        },
        []
    );

    const handleKey = useCallback(
        (e: KeyboardEvent) => {
            // Check if there is an active input element before triggering the shortcut
            const activeElement = document.activeElement as HTMLElement;
            if (
                activeElement instanceof HTMLInputElement ||
                activeElement instanceof HTMLTextAreaElement
            ) {
                return;
            }

            setKey(e.key);
            shortcuts.forEach((short) => handleShortcut(e, short));
        },
        [shortcuts, handleShortcut]
    );

    useEffect(() => {
        document.addEventListener("keydown", handleKey);

        return () => {
            document.removeEventListener("keydown", handleKey);
        };
    }, []);

    return key;
}
