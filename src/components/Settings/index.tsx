"use client";
import { FC, useState } from "react";
import Modal from "../ui/Modal";
import { DialogProps } from "@radix-ui/react-dialog";
import useHotkeys from "../Todos/useHotkeys";
import { saveTodosToFirestore } from "@/firebase/firestore/utils";
import { User } from "firebase/auth";
import { Todo } from "@/lib/types";
import Toast from "../ui/Toast";
import Button from "../ui/Button";
import { MdHelp, MdSave } from "react-icons/md";
import Help from "./Help";
import Switch from "../ui/Switch";
import { useUserSettingsStore } from "@/store/userSettings";

interface SettingsProps extends DialogProps {
    user: User | null;
    todos: Todo[];
}

const Settings: FC<SettingsProps> = ({ user, todos, ...props }) => {
    const [saveToastOpen, setSaveToastOpen] = useState(false);
    const [helpOpen, setHelpOpen] = useState(false);
    const setAutoSync = useUserSettingsStore((state) => state.setAutoSync);
    const autoSync = useUserSettingsStore(
        (state) => state.userSettings.autosync
    );

    const key = useHotkeys([
        {
            key: "s",
            dispatch: () => {
                saveTodosToFirestore(user, todos);
                setSaveToastOpen(true);
            },
            // value: null,
            ctrlKey: true,
        },
    ]);
    return (
        <>
            <Modal title="Settings" {...props}>
                <div className="flex flex-col w-full gap-5">
                    <div>
                        <h2 className="text-xl font-semibold">Sync</h2>
                        {user ? null : "Login to start syncing your todos"}
                        {user ? (
                            <>
                                <fieldset className="flex items-center gap-2">
                                    <label className="flex-1" htmlFor="save">
                                        Sync todos throughout your devices
                                    </label>
                                    <Button
                                        name="save"
                                        id="save"
                                        className=" text-3xl p-3 shadow-lg"
                                        onClick={() => {
                                            saveTodosToFirestore(user, todos);
                                            setSaveToastOpen(true);
                                        }}
                                    >
                                        <MdSave />
                                    </Button>
                                </fieldset>

                                <fieldset>
                                    {/* <label htmlFor="autosync">
                                        Automatic Sync
                                    </label> */}
                                    <Switch
                                        defaultChecked={autoSync}
                                        onCheckedChange={setAutoSync}
                                        labelText="Automatic Sync"
                                        id="autosync"
                                    />
                                </fieldset>
                            </>
                        ) : null}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Hotkeys Help</h2>
                        <fieldset className="flex items-center gap-2">
                            <label className="flex-1" htmlFor="openhelp">
                                Easy to remember hotkeys for everything
                            </label>
                            <Button
                                name="openhelp"
                                id="openhelp"
                                className=" text-3xl p-3 shadow-lg"
                                onClick={() => {
                                    setHelpOpen(true);
                                }}
                            >
                                <MdHelp />
                            </Button>
                        </fieldset>
                    </div>
                </div>
            </Modal>
            <Toast
                title="Saved Successfully"
                open={saveToastOpen}
                onOpenChange={setSaveToastOpen}
            />
            <Help open={helpOpen} onOpenChange={setHelpOpen} />
        </>
    );
};

export default Settings;
