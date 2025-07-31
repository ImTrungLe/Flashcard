import { IconBar, IconBell, IconPencil } from "../icons";
import { useStoreActions } from "../hooks/useStore";
const Navbar = () => {
    const handleOpenSidebar = useStoreActions(
        (actions) => actions.handleOpenSidebar
    );

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
                    />
                </div>

                <div className="flex flex-1 gap-2 items-center justify-end">
                    <IconBell className="size-5" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
