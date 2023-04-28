import { UserSettings } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserSettingsStore {
    userSettings: UserSettings;
    setAutoSync: (value: boolean) => void;
}

export const useUserSettingsStore = create<UserSettingsStore>()(
    persist(
        (set) => ({
            userSettings: {
                autosync: true,
            },
            setAutoSync: (value) =>
                set((state) => {
                    const userSettings = state.userSettings;
                    userSettings.autosync = value;
                    return { userSettings };
                }),
        }),
        { name: "userSettings" }
    )
);
