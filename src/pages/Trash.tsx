import { useStoreActions, useStoreState } from "easy-peasy";

import { TableList } from "../components/TableList";

const columns = [
    { title: "Content", dataIndex: "content" },
    { title: "Definition", dataIndex: "definition" },
    { title: "Statis", dataIndex: "stage" },
];

const Trash = () => {
    const clearWords = useStoreActions((actions) => actions.clearWords);
    const storeWords = useStoreState((state) => state.words);

    const handleEdit = () => {};
    const handleDelete = () => {};

    return (
        <>
            <div className="w-full flex flex-row justify-between items-end">
                <div className="text-xl font-bold">Trash in Flashcard</div>
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
            <div className="p-4">
                <TableList
                    columns={columns}
                    data={storeWords}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    totalItems={storeWords.length}
                />
            </div>
        </>
    );
};

export default Trash;
