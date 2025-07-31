import { useDroppable } from "@dnd-kit/core";
const DropZone = ({ id }) => {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className={`h-6 rounded transition-all duration-200 ease-in-out ${
                isOver ? "bg-blue-200" : "bg-transparent"
            }`}
        />
    );
};

export default DropZone;
