import {
    IconAdd,
    IconBar,
    IconBell,
    IconPencil,
    IconMoon,
    IconSun,
} from "../icons";
import { useStoreActions, useStoreState } from "../hooks/useStore";

const Navbar = ({ theme, setTheme }) => {
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
        <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sitcky z-10 top-0">
            <div className="flex gap-4 w-full">
                <button
                    className="bg-gray-500 p-2 rounded-full block lg:hidden"
                    onClick={handleOpenSidebar}
                >
                    <IconBar className="text-white size-5" />
                </button>

                <div className="w-84 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]">
                    <IconPencil className="size-5" />
                    <input
                        type="text"
                        placeholder="Add new word here"
                        className="flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800"
                        onChange={handleGetWord}
                        value={inputValue}
                    />
                    <button onClick={handleAddWord}>
                        <IconAdd className="size-6" />
                    </button>
                </div>

                <div className="flex flex-1 gap-2 items-center justify-end">
                    <IconBell className="size-5" />
                </div>
                <div className="flex flex-end p-2 bg-zinc-100 rounded-xl w-fit">
                    <button
                        className="bg-transparent p-3 hover:bg-zinc-200 dark:hover:bg-zinc-100/10 rounded-lg text-black dark:text-white"
                        onClick={() => setTheme("")}
                    >
                        <IconSun className="size-5" />
                    </button>
                    <button
                        className="bg-transparent p-3 hover:bg-zinc-200 dark:hover:bg-zinc-100/10 rounded-lg text-black dark:text-white"
                        onClick={() => setTheme("dark")}
                    >
                        <IconMoon className="size-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
