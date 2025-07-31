import { useState } from "react";
import { useParams } from "react-router-dom";

import Title from "../components/Title";
import Tabs from "../components/Tabs";
import WordTitle from "../components/WordTitle";
import { WordCard } from "../components";

const TABS = [
    {
        title: "Board View",
        icon: "",
    },
    {
        title: "List View",
        icon: "",
    },
];

const WORD_TYPE = {
    new: "bg-blue-600",
    learning: "bg-yellow-600",
    done: "bg-green-600",
};

const data = [
    {
        _id: "1",
        content: "Vocabulary",
        stage: "new",
    },
    {
        _id: "2",
        content: "English",
        stage: "learning",
    },
    {
        _id: "3",
        content: "Yard",
        stage: "learning",
    },
    {
        _id: "4",
        content: "Hard",
        stage: "done",
    },
];

const groupedData = {
    new: data.filter((word) => word.stage === "new"),
    learning: data.filter((word) => word.stage === "learning"),
    done: data.filter((word) => word.stage === "done"),
};

const Words = () => {
    const params = useParams();

    // const [selected, setSelected] = useState(0);
    // const [open, setOpen] = useState(false);

    const status = params?.status || "";

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <Title
                    title={status ? `${status} Words` : "Words"}
                    className={"text-4xl"}
                />
            </div>

            <div className="flex w-full gap-6">
                {["new", "learning", "done"].map((status) => (
                    <div key={status} className="flex-1">
                        <WordTitle
                            label={status}
                            className={WORD_TYPE[status]}
                        />
                        <div className="mt-4 flex flex-col gap-4">
                            {data
                                .filter((word) => word.stage === status)
                                .map((word, index) => (
                                    <WordCard word={word} key={index} />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Words;
