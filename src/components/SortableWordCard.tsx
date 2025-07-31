import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import WordCard from "./WordCard";

const SortableWordCard = ({ word }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: word._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        scale: isDragging ? 0.95 : 1,
        boxShadow: isDragging ? "0 4px 12px rgba(0, 0, 0, 0.2)" : "none",
        zIndex: isDragging ? 50 : "auto",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <WordCard word={word} />
        </div>
    );
};

export default SortableWordCard;
