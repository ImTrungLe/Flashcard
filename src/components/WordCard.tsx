import { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";

import { IconDocPlus, IconTrash } from "../icons";
import Popup from "./Popup";
import { Button, Textarea } from "@headlessui/react";
import { generateDefinitionAndExamples } from "../utils/gemini";

const WordCard = ({ word, disableActions = false }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const updateDef = useStoreActions((actions) => actions.updateDefinition);

    const handleShowPopup = () => setShowPopup(true);

    const removeWord = useStoreActions((actions) => actions.removeWord);

    const handleGenerate = async () => {
        setLoading(true);
        const content = await generateDefinitionAndExamples(word.content);
        updateDef({ id: word._id, definition: content });
        setLoading(false);
    };

    useEffect(() => {
        if (showPopup) {
            setInputValue(word.definition || "");
        }
    }, [showPopup, word.definition]);

    const handleRemoveWord = () => {
        removeWord(word._id);
    };

    return (
        <div className="relative flex flex-row w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-grab active:cursor-grabbing dark:bg-gray-800">
            <div className="flex flex-1 flex-col cursor-grab active:cursor-grabbing">
                <p className="ftext-xs text-gray-400 capitalize tracking-wide mb-2 dark:text-white">
                    {word.stage}
                </p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                    {word.content}
                </p>
            </div>
            {!disableActions && (
                <div>
                    <button
                        onClick={handleShowPopup}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="w-7 h-7 bg-gray-400 text-white rounded-full flex items-center justify-center mb-2"
                    >
                        <IconDocPlus className="w-4 h-4" />
                    </button>
                    {showPopup && (
                        <Popup
                            showPopup={showPopup}
                            setShowPopup={setShowPopup}
                        >
                            <h2 className="text-2xl font-semibold mb-2">
                                {word.content}
                            </h2>
                            <div>
                                <Textarea
                                    name="description"
                                    className="w-full h-26 p-2 mb-2 border-[0.5px] rounded-md data-hover:shadow dark:bg-gray-500"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    placeholder="Type here to define"
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                    }}
                                    value={inputValue}
                                />
                            </div>
                            <div className="w-full flex flex-row justify-between">
                                <div className="w-full">
                                    <Button
                                        onClick={handleGenerate}
                                        onPointerDown={(e) =>
                                            e.stopPropagation()
                                        }
                                        className="rounded bg-yellow-600 px-4 py-2 text-sm text-white data-hover:bg-yello-500 data-hover:data-active:bg-yellow-700"
                                    >
                                        {loading
                                            ? "Loading..."
                                            : "Gemini generate"}
                                    </Button>
                                </div>
                                <div className="w-full justify-end flex flex-row gap-2">
                                    <Button
                                        onClick={() => {
                                            updateDef({
                                                id: word._id,
                                                definition: inputValue,
                                            });
                                            setShowPopup(false);
                                        }}
                                        onPointerDown={(e) =>
                                            e.stopPropagation()
                                        }
                                        className="rounded bg-sky-600 px-4 py-2 text-sm text-white data-hover:bg-sky-500 data-hover:data-active:bg-sky-700"
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        onClick={() => setShowPopup(false)}
                                        onPointerDown={(e) =>
                                            e.stopPropagation()
                                        }
                                        className="rounded bg-red-600 px-4 py-2 text-sm text-white data-hover:bg-red-500 data-hover:data-active:bg-red-700"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        </Popup>
                    )}
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
