import { useState, useRef } from "react";
import { IconDocPlus, IconTrash } from "../icons";
import { useStoreActions } from "easy-peasy";

const WordCard = ({ word, disableActions = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const removeWord = useStoreActions((actions) => actions.removeWord);

    const handleRemoveWord = () => {
        removeWord(word._id);
    };

    return (
        <div className="flex flex-row w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing">
            <div className="flex flex-1 flex-col cursor-grab active:cursor-grabbing">
                <p className="ftext-xs text-gray-400 capitalize tracking-wide mb-2">
                    {word.stage}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                    {word.content}
                </p>
            </div>
            {!disableActions && (
                <div>
                    <button
                        ref={buttonRef}
                        onClick={() => setIsOpen(true)}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="w-7 h-7 bg-gray-400 text-white rounded-full flex items-center justify-center mb-2"
                    >
                        <IconDocPlus className="w-4 h-4" />
                    </button>
                    <button
                        onClick={handleRemoveWord}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="w-7 h-7 bg-red-400 text-white rounded-full flex items-center justify-center"
                    >
                        <IconTrash className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default WordCard;
