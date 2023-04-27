import firebase_app from "../config";
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateCurrentUser,
    updateProfile,
} from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        // result.user.
        // await updateCurrentUser(auth, result.user);
        await updateProfile(user, { displayName: user.email?.split("@")[0] });
    } catch (e) {
        error = e;
    }

    return { result, error };
}
