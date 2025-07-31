import React from "react";

interface PopupProps {
    anchorRef: React.RefObject<HTMLElement>;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({
    anchorRef,
    isOpen,
    onClose,
    children,
}) => {
    if (!isOpen || !anchorRef.current) return null;

    const rect = anchorRef.current.getBoundingClientRect();
    const style: React.CSSProperties = {
        position: "absolute",
        top: rect.top - 10, // phía trên một chút
        left: rect.right + 10, // phía bên phải
        zIndex: 9999,
    };

    return (
        <div
            style={style}
            className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg"
        >
            <button
                className="text-gray-400 hover:text-red-500 float-right"
                onClick={onClose}
            >
                &times;
            </button>
            <div className="clear-both">{children}</div>
        </div>
    );
};

export default Popup;
