import React from "react";
import DropZone from "./DropZone";
const DroppableColumn = ({ id, children }) => {
    return (
        <div className="w-1/3 bg-gray-100 rounded-lg p-4 min-h-[350px] flex flex-col space-y-4">
            {children}
            <DropZone id={id} />
        </div>
    );
};

export default DroppableColumn;
