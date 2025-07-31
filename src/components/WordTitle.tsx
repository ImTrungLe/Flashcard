import clsx from "clsx";
import React from "react";

const WordTitle = ({ label, className }) => {
    return (
        <div className="w-full h-10 md:h-12 px-3 md:px-4 rounded bg-white flex items-center justify-between border-b border-gray-200 shadow-sm">
            <div className="flex gap-2 items-center">
                <div
                    className={clsx(
                        "w-3.5 h-3.5 md:w-4 md:h-4 rounded-full",
                        className
                    )}
                />
                <p className="text-sm md:text-base font-medium text-gray-700 capitalize">
                    {label}
                </p>
            </div>
        </div>
    );
};

export default WordTitle;
