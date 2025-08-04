import { useState } from "react";

import {
    IconAdd,
    IconBar,
    IconBell,
    IconPencil,
    IconMoon,
    IconSun,
} from "../icons";
import { useStoreActions, useStoreState } from "../hooks/useStore";
import { useDarkMode } from "../context/ThemeContext";
import Toast from "./Toast";

const Navbar = () => {
    const [showToastSuccess, setShowToastSuccess] = useState(false);
    const [showToastFail, setShowToastFail] = useState(false);
    const { darkMode, setDarkMode } = useDarkMode();
    const handleOpenSidebar = useStoreActions(
        (actions) => actions.handleOpenSidebar
    );

    const inputValue = useStoreState((state) => state.inputValue);
    const setInputValue = useStoreActions((actions) => actions.setInputValue);
    const addWord = useStoreActions((actions) => actions.addWord);

    const handleGetWord = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleAddWord = () => {
        if (inputValue !== "") {
            addWord();
        }
    };

    return (
        <div className="flex justify-between items-center bg-white dark:bg-[#161b22] px-4 py-3 2xl:py-4 sticky top-0 z-10 transition-colors border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-4 w-full">
                <button
                    className="bg-gray-500 p-2 rounded-full block lg:hidden"
                    onClick={handleOpenSidebar}
                >
                    <IconBar className="text-white size-5" />
                </button>

                <div className="w-84 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-gray-100 dark:bg-[#21262d] transition-colors">
                    <IconPencil className="size-5 text-gray-600 dark:text-gray-300" />
                    <input
                        type="text"
                        placeholder="Add new word here"
                        className="flex-1 outline-none bg-transparent placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-800 dark:text-white"
                        onChange={handleGetWord}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                console.log(e);
                                handleAddWord();
                            }
                        }}
                        value={inputValue}
                    />
                    <button onClick={handleAddWord}>
                        <IconAdd className="size-6 text-gray-700 dark:text-white" />
                    </button>
                </div>

                <div className="flex flex-1 gap-2 items-center justify-end">
                    <IconBell className="size-5 text-gray-600 dark:text-gray-300" />
                </div>

                <div className="flex p-2 bg-zinc-100 dark:bg-[#1f2937] rounded-xl w-fit transition-colors">
                    <button
                        className="bg-transparent p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg text-black dark:text-white transition-colors"
                        onClick={() => setDarkMode(!darkMode)}
                    >
                        {darkMode ? (
                            <IconMoon className="size-5" />
                        ) : (
                            <IconSun className="size-5" />
                        )}
                    </button>
                </div>
            </div>
            {showToastSuccess && (
                <Toast
                    message="Successfully added!"
                    type="success"
                    duration={2000}
                    onClose={() => setShowToastSuccess(false)}
                />
            )}
            {showToastFail && (
                <Toast
                    message="Successfully added!"
                    type="success"
                    duration={2000}
                    onClose={() => setShowToastFail(false)}
                />
            )}
        </div>
    );
};

export default Navbar;
