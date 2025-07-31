import { useStoreState, useStoreActions } from "../hooks/useStore";
import { IconClose } from "../icons"; // hoặc icon bạn thích
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
    const isOpen = useStoreState((state) => state.isOpen);
    const handleCloseSidebar = useStoreActions(
        (actions) => actions.handleCloseSidebar
    );

    return (
        <>
            <div
                className={`fixed inset-0 bg-white/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                onClick={handleCloseSidebar}
            ></div>

            <div
                className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Sidebar
                    </h2>
                    <button onClick={handleCloseSidebar}>
                        <IconClose className="size-5 text-gray-700" />
                    </button>
                </div>

                <Sidebar />
            </div>
        </>
    );
};

export default MobileSidebar;
