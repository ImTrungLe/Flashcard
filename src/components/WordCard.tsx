import { useEffect, useState } from "react";
import { useStoreActions } from "easy-peasy";

import { IconDocPlus, IconTrash } from "../icons";
import Popup from "./Popup";
import { Button, Textarea } from "@headlessui/react";
import { generateDefinitionAndExamples } from "../utils/gemini";

const WordCard = ({ word, disableActions = false }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [definition, setDefinition] = useState("");
    const [examples, setExamples] = useState("");
    const [loading, setLoading] = useState(false);
    const updateDef = useStoreActions((actions) => actions.updateDefinition);

    const handleShowPopup = () => setShowPopup(true);

    const removeWord = useStoreActions((actions) => actions.removeWord);

    const handleGenerate = async () => {
        setLoading(true);
        const content = await generateDefinitionAndExamples(word.content);
        setInputValue(content); // vẫn lưu raw
        const parsed = handleDefinition(content);
        setDefinition(parsed?.definition || "");
        setExamples(parsed?.examples?.join("\n") || "");
        setLoading(false);
    };

    const handleDefinition = (text: string) => {
        if (text) {
            const definitionMatch = text.match(/Definition:\s*(.+)/);
            const examplesMatch = text.match(/Examples:\s*([\s\S]*)/);

            const definition = definitionMatch ? definitionMatch[1].trim() : "";

            const examples = examplesMatch
                ? examplesMatch[1]
                      .split(/\n+/)
                      .map((line) => line.trim())
                      .filter((line) => line !== "")
                : [];

            return { definition, examples };
        } else {
            return { definition: "", examples: [] };
        }
    };

    const handleSaveChange = () => {
        const parts = [];

        if (definition.trim()) {
            parts.push(`Definition:${definition}`);
        }
        if (examples.trim()) {
            parts.push(`Examples:${examples}`);
        }

        const fullDefinition = parts.join("\n");

        updateDef({
            id: word._id,
            definition: fullDefinition,
        });
    };

    useEffect(() => {
        if (showPopup) {
            setInputValue(word.definition || "");
            const parsed = handleDefinition(word.definition);
            setDefinition(parsed.definition);
            setExamples(parsed.examples.join("\n") || "");
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
                <p className="text-lg font-semibold capitalize text-gray-800 dark:text-white">
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
                            <div className="flex justify-between items-center my-6">
                                <button
                                    onClick={handleGenerate}
                                    disabled={loading}
                                    onPointerDown={(e) => e.stopPropagation()}
                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400 to-cyan-400 text-white font-semibold"
                                >
                                    {loading
                                        ? "Loading..."
                                        : "Gemnerate with Gemini"}
                                </button>
                                <div className="space-x-2">
                                    <button
                                        disabled={loading}
                                        onClick={() => {
                                            handleSaveChange();
                                            setShowPopup(false);
                                        }}
                                        onPointerDown={(e) =>
                                            e.stopPropagation()
                                        }
                                        className="px-4 py-2 rounded-full bg-blue-500 text-white font-semibold"
                                    >
                                        Save
                                    </button>
                                    <button
                                        disabled={loading}
                                        onClick={() => setShowPopup(false)}
                                        onPointerDown={(e) =>
                                            e.stopPropagation()
                                        }
                                        className="px-4 py-2 rounded-full bg-blue-300 text-white font-semibold"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>

                            <div className="text-center capitalize text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg mb-4">
                                {word.content}
                            </div>

                            <div className="mb-4">
                                <h3 className="text-lg font-semibold dark:text-white text-gray-800 mb-1">
                                    Meaning
                                </h3>
                                <Textarea
                                    name="description"
                                    className="w-full h-36 p-2 mb-2 border-[0.5px] rounded-md data-hover:shadow dark:bg-gray-500"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    placeholder="Type here to define"
                                    onChange={(e) =>
                                        setDefinition(e.target.value)
                                    }
                                    value={definition}
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold dark:text-white text-gray-800 mb-2">
                                    Examples
                                </h3>

                                <Textarea
                                    name="description"
                                    className="w-full h-32 p-2 mb-2 border-[0.5px] rounded-md data-hover:shadow dark:bg-gray-500"
                                    onPointerDown={(e) => e.stopPropagation()}
                                    placeholder="Type here to define"
                                    onChange={(e) =>
                                        setExamples(e.target.value)
                                    }
                                    value={examples}
                                    disabled={loading}
                                />
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
