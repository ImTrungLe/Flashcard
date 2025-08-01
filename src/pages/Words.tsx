import { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
    DndContext,
    closestCenter,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { WordCard, WordTitle } from "../components";
import { WORD_TYPE } from "../assets/data";
import DroppableColumn from "../components/DroppableColumn";
import SortableWordCard from "../components/SortableWordCard";
// Sortable WordCard

const Words = () => {
    const storeWords = useStoreState((state) => state.words);
    const updateWordStage = useStoreActions(
        (actions) => actions.updateWordStage
    );
    const clearWords = useStoreActions((actions) => actions.clearWords);

    const [columns, setColumns] = useState({
        new: [],
        learning: [],
        done: [],
    });

    useEffect(() => {
        console.log(storeWords);
        setColumns({
            new: storeWords.filter((d) => d.stage === "new"),
            learning: storeWords.filter((d) => d.stage === "learning"),
            done: storeWords.filter((d) => d.stage === "done"),
        });
    }, [storeWords]);

    const [activeCard, setActiveCard] = useState(null);
    const sensors = useSensors(useSensor(PointerSensor));

    const findColumnById = (id) => {
        return Object.keys(columns).find((col) =>
            columns[col].some((item) => item._id === id)
        );
    };

    const handleDragStart = (event) => {
        const { active } = event;
        const column = findColumnById(active.id);
        const item = columns[column].find((i) => i._id === active.id);
        setActiveCard(item);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveCard(null);
        if (!over) return;

        const sourceCol = findColumnById(active.id);
        if (!sourceCol) return;

        let destCol = findColumnById(over.id);
        let overIndex = -1;

        if (columns[over.id]) {
            destCol = over.id;
        } else {
            overIndex = columns[destCol].findIndex((i) => i._id === over.id);
        }

        if (!destCol) return;

        const activeIndex = columns[sourceCol].findIndex(
            (i) => i._id === active.id
        );
        const item = { ...columns[sourceCol][activeIndex], stage: destCol };

        if (sourceCol === destCol) {
            if (activeIndex !== overIndex && overIndex !== -1) {
                const newItems = arrayMove(
                    columns[sourceCol],
                    activeIndex,
                    overIndex
                );
                const newCols = {
                    ...columns,
                    [sourceCol]: newItems,
                };
                setColumns(newCols);
                updateWordStage(newCols);
            }
        } else {
            const newSource = [...columns[sourceCol]];
            newSource.splice(activeIndex, 1);

            const newDest = [...columns[destCol]];
            const insertAt = overIndex === -1 ? newDest.length : overIndex;
            newDest.splice(insertAt, 0, item);

            const newCols = {
                ...columns,
                [sourceCol]: newSource,
                [destCol]: newDest,
            };
            setColumns(newCols);
            updateWordStage(newCols);
        }
    };

    return (
        <>
            <div className="w-full flex flex-row justify-between items-end">
                <div className="text-xl font-bold">Words in Flashcard</div>
                <div className="flex flex-row gap-4">
                    <button
                        className="flex justify-end px-4 py-2 bg-red-400 text-white rounded hover:bg-red-300"
                        onClick={() => {
                            clearWords();
                        }}
                    >
                        Delete all
                    </button>
                </div>
            </div>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="flex gap-4 p-4">
                    {Object.entries(columns).map(([colName, items]) => (
                        <DroppableColumn key={colName} id={colName}>
                            <WordTitle
                                label={colName}
                                className={`${WORD_TYPE[colName]}`}
                            />
                            <SortableContext
                                items={items.map((item) => item._id)}
                                strategy={verticalListSortingStrategy}
                            >
                                {items.map((item) => (
                                    <SortableWordCard
                                        key={item._id}
                                        word={item}
                                    />
                                ))}
                            </SortableContext>
                        </DroppableColumn>
                    ))}
                </div>

                <DragOverlay
                    dropAnimation={{ duration: 300, easing: "ease-out" }}
                >
                    {activeCard ? (
                        <div className="scale-105 opacity-90 shadow-lg pointer-events-none">
                            <WordCard word={activeCard} disableActions />
                        </div>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </>
    );
};

export default Words;
