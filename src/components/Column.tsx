import {
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import WordCard from "./WordCard";
import WordTitle from "./WordTitle";

const Column = ({ id, items }) => {
    const { setNodeRef } = useDroppable({ id });
    const WORD_TYPE = {
        new: "bg-blue-600",
        learning: "bg-yellow-600",
        done: "bg-green-600",
    };

    return (
        <div
            ref={setNodeRef}
            className="w-1/3 bg-gray-100 rounded-lg p-4 min-h-[300px] space-y-4"
        >
            <WordTitle label={id} className={`${WORD_TYPE[id]}`} />
            <SortableContext
                items={items.map((item) => item._id)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <SortableItem key={item._id} item={item} />
                ))}
            </SortableContext>
        </div>
    );
};

const SortableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item._id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <WordCard word={item} />
        </div>
    );
};

export default Column;
