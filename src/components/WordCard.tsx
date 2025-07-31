import clsx from "clsx";
import React, { useState } from "react";

// const ICONS = {
//     high: <MdKeyboardDoubleArrowUp />,
//     medium: <MdKeyboardArrowUp />,
//     low: <MdKeyboardArrowDown />,
// };

const WordCard = ({ word }) => {
    return (
        <div className="w-full h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between">
            <div className="h-full flex flex-1 flex-col justify-between">
                <p className="test-base text-gray-600">{word.stage}</p>
                <span className="text-2xl font-semibold">{word.content}</span>
                <span className="text-sm text-gray-400">{"last month"}</span>
            </div>
        </div>
    );
};

export default WordCard;
