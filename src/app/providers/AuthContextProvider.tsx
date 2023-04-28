"use client";
import React from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "@/firebase/config";
import Spinner from "@/components/ui/Spinner";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<{ user: User | null }>({
    user: null,
});

export const useAuthContext = () =>
    React.useContext<{ user: User | null }>(AuthContext);

interface AuthContextProviderProps {
    children?: React.ReactNode;
}
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
    const [user, setUser] = React.useState<User | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? (
                <div className="w-full h-full flex items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};
