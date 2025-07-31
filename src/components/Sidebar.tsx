import { Link, useLocation } from "react-router-dom";

import { IconFlash, IconHome, IconTrash, IconWord } from "../icons";

const sidebarLinks = [
    {
        label: "Home",
        link: "",
        icon: <IconHome className="size-5" />,
    },
    {
        label: "Words",
        link: "words",
        icon: <IconWord className="size-5" />,
    },
    {
        label: "Trash",
        link: "trash",
        icon: <IconTrash className="size-5" />,
    },
];

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];

    const NavLink = ({ el }) => {
        return (
            <Link
                to={el.link}
                className={`w-full lg:w-7/8 flex gap-2 px-3 py-3 rounded-full items-center text-gray-800 text-base ${
                    path === el.link.split("/")[0]
                        ? "bg-blue-400 text-white"
                        : "hover:bg-[#2564ed2d]"
                }`}
            >
                {el.icon}
                <span>{el.label}</span>
            </Link>
        );
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 p-5">
            <h1 className="flex items-center gap-3">
                <p className="bg-blue-600 p-2 rounded-full">
                    <IconFlash className="text-white size-8" />
                </p>
                <span className="text-2xl font-bold text-black">FlashCard</span>
            </h1>
            <div className="flex flex-1 flex-col gap-y-5 py-8">
                {sidebarLinks.map((link) => {
                    return <NavLink el={link} key={link.label} />;
                })}
            </div>
        </div>
    );
};

export default Sidebar;
