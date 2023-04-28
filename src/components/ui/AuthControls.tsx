"use client";
import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import signIn from "@/firebase/auth/signin";
import signUp from "@/firebase/auth/signup";
import Field from "./Field";
import { useAuthContext } from "@/app/providers/AuthContextProvider";
import { getAuth, signOut } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { useTodosStore } from "@/store";
import {
    fetchTodos,
    getTodos,
    saveTodosToFirestore,
} from "@/firebase/firestore/utils";
import PasswordField from "./PasswordField";

interface AuthControlsProps {}

const AuthControls: FC<AuthControlsProps> = ({}) => {
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [signInOpen, setSignInOpen] = useState(false);

    const { user } = useAuthContext();
    const todos = useTodosStore((state) => state.todos);

    return (
        <>
            {user === null ? (
                <>
                    <Button onClick={() => setSignUpOpen(true)}>Sign Up</Button>
                    <Button
                        variant="secondary"
                        onClick={() => setSignInOpen(true)}
                    >
                        Sign In
                    </Button>
                    <SignInForm
                        signInOpen={signInOpen}
                        setSignInOpen={setSignInOpen}
                    />
                    <SignUpForm
                        signUpOpen={signUpOpen}
                        setSignUpOpen={setSignUpOpen}
                    />
                </>
            ) : (
                <Button
                    onClick={() => {
                        signOut(getAuth(firebase_app));
                        saveTodosToFirestore(user, todos);
                    }}
                    variant="secondary"
                >
                    Sign Out
                </Button>
            )}
        </>
    );
};

// SIGN UP
const SignUpForm = ({
    signUpOpen,
    setSignUpOpen,
}: {
    signUpOpen: boolean;
    setSignUpOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const todos = useTodosStore((state) => state.todos);

    const handleForm = async (event: FormEvent) => {
        event.preventDefault();

        const { result, error } = await signUp(email, password);

        if (error) {
            return console.log(error);
        }

        console.log(result);

        // saving already cached todos to firestore
        if (result) {
            await saveTodosToFirestore(result.user, todos);
        }
        setSignUpOpen(false);
        return router.push("/");
    };
    return (
        <Modal title="Sign Up" open={signUpOpen} onOpenChange={setSignUpOpen}>
            <form onSubmit={handleForm} className="flex flex-col gap-5">
                <Field
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    id="email"
                    labelText="Email"
                    type="email"
                    placeholder="abc@example.com"
                />
                {/* <Field
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    id="password"
                    labelText="Password"
                    type="password"
                    placeholder=""
                /> */}
                <PasswordField
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    id="password"
                    labelText="Password"
                    type="password"
                    placeholder=""
                />
                <Button type="submit" className="self-end">
                    Sign Up
                </Button>
            </form>
        </Modal>
    );
};

// SIGN IN
const SignInForm = ({
    signInOpen,
    setSignInOpen,
}: {
    signInOpen: boolean;
    setSignInOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const setTodos = useTodosStore((state) => state.setAll);

    const handleForm = async (event: FormEvent) => {
        event.preventDefault();

        const { result, error } = await signIn(email, password);

        if (error) {
            return console.log(error);
        }

        // else successful
        console.log(result?.user.uid);
        setSignInOpen(false);
        if (result) {
            const todos = await fetchTodos(result.user);
            setTodos(todos);
        }

        return router.push("/");
    };
    return (
        <Modal title="SignIn" open={signInOpen} onOpenChange={setSignInOpen}>
            <form onSubmit={handleForm} className="flex flex-col gap-5">
                <Field
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    id="email"
                    labelText="Email"
                    type="email"
                    placeholder="abc@example.com"
                />
                <Field
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    id="password"
                    labelText="Password"
                    type="password"
                    placeholder=""
                />
                <Button type="submit" className="self-end">
                    Sign In
                </Button>
            </form>
        </Modal>
    );
};

export default AuthControls;
