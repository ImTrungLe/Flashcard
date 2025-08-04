import { useEffect, useState } from "react";

const Toast = ({ message, type = "success", duration = 3000, onClose }) => {
    const [visible, setVisible] = useState(false); // dùng cho animation
    const [shouldRender, setShouldRender] = useState(true); // để delay việc unmount

    useEffect(() => {
        // Toast trượt vào
        setVisible(true);

        const hideTimer = setTimeout(() => {
            setVisible(false); // toast trượt ra
            setTimeout(() => {
                setShouldRender(false); // gỡ khỏi DOM sau animation
                if (onClose) onClose();
            }, 300); // thời gian khớp với animation (300ms)
        }, duration);

        return () => {
            clearTimeout(hideTimer);
        };
    }, [duration, onClose]);

    if (!shouldRender) return null;

    const typeStyles = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-400 text-black",
    };

    return (
        <div
            className={`
                fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-md
                transform transition-transform duration-300 ease-in-out
                ${visible ? "translate-x-0" : "translate-x-full"}
                ${typeStyles[type]}
            `}
        >
            {message}
        </div>
    );
};

export default Toast;
