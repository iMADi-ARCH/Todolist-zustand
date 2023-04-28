import { Todo } from "@/lib/types";
import firebase_app from "../config";
import {
    getFirestore,
    doc,
    setDoc,
    writeBatch,
    getDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { useTodosStore } from "@/store";

const db = getFirestore(firebase_app);
export async function addData(collection: string, id: string, data: any) {
    let result = null;
    let error = null;

    try {
        result = await setDoc(doc(db, collection, id), data, {
            merge: true,
        });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function addTodos(user: User, todos: Todo[]) {
    let result = null;
    let error = null;
    const batch = writeBatch(db);
    try {
        result = await setDoc(doc(db, "users", user.uid), { todos });
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function fetchTodos(user: User) {
    let todos: Todo[] = [];
    console.log("FETCHING TODOS");

    const userSnap = await getDoc(doc(db, "users", user.uid));
    if (userSnap.exists()) {
        todos = userSnap.get("todos");
    } else {
        console.log("no such document");
        // return todos;
    }
    return todos;
}

export async function getTodos(user: User | null, cachedTodos: Todo[]) {
    let todos: Todo[] = cachedTodos;
    // const cachedTodos = useTodosStore((state) => state.todos);
    if (user) {
        let isStale = true;
        if (user.metadata.lastSignInTime) {
            const loginDayGap =
                new Date().getTime() -
                new Date(user.metadata.lastSignInTime).getTime();
            console.log(loginDayGap);
            isStale = loginDayGap > 5000;
        }

        if (cachedTodos.length === 0 || isStale) {
            todos = await fetchTodos(user);
        }
    }
    return todos;
}

export const saveTodosToFirestore = async (
    user: User | null,
    todos: Todo[]
) => {
    if (user) {
        const { result, error } = await addTodos(user, todos);
        if (!error) console.log("Saved Successfully");
        console.log(result, error);
    }
};
