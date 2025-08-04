import { action, type Action, createStore } from "easy-peasy";

export interface WordType {
    _id: string;
    content: string;
    stage: "new" | "learning" | "done";
    definition: string;
}
export interface StoreModel {
    isOpen: boolean;
    inputValue: string;
    word: string;
    words: WordType[];

    handleOpenSidebar: Action<StoreModel>;
    handleCloseSidebar: Action<StoreModel>;
    setOpen: Action<StoreModel, boolean>;
    setClose: Action<StoreModel, boolean>;

    setInputValue: Action<StoreModel, string>;
    setWord: Action<StoreModel, string>;

    setWords: Action<StoreModel, WordType[]>;
    addWord: Action<StoreModel>;
    updateWordStage: Action<StoreModel>;
    removeWord: Action<StoreModel, string>;
    clearWords: Action<StoreModel>;

    updateDefinition: Action<StoreModel, { id: string; definition: string }>;
}

const initialData: WordType[] = [
    { _id: "1", content: "Vocabulary", stage: "new", definition: "" },
    { _id: "2", content: "English", stage: "learning", definition: "" },
    { _id: "3", content: "Yard", stage: "learning", definition: "" },
    { _id: "4", content: "Hard", stage: "done", definition: "" },
    { _id: "5", content: "Maintain", stage: "new", definition: "" },
    { _id: "6", content: "Legacy", stage: "new", definition: "" },
    { _id: "7", content: "Notebook", stage: "learning", definition: "" },
    { _id: "8", content: "Job", stage: "done", definition: "" },
    { _id: "9", content: "Football", stage: "new", definition: "" },
    { _id: "10", content: "Family", stage: "done", definition: "" },
    { _id: "11", content: "Difficult", stage: "learning", definition: "" },
    { _id: "12", content: "Popular", stage: "done", definition: "" },
    { _id: "13", content: "Polite", stage: "new", definition: "" },
    { _id: "14", content: "Police", stage: "new", definition: "" },
    { _id: "15", content: "Vietnamese", stage: "done", definition: "" },
];

const getStoredWords = (): WordType[] => {
    const stored = localStorage.getItem("words");
    return stored ? JSON.parse(stored) : initialData;
};

const storeModel: StoreModel = {
    isOpen: false,
    inputValue: "",
    word: "",
    words: getStoredWords(),

    handleOpenSidebar: action((state) => {
        state.isOpen = true;
    }),

    handleCloseSidebar: action((state) => {
        state.isOpen = false;
    }),

    setOpen: action((state, payload) => {
        state.isOpen = payload;
    }),

    setClose: action((state, payload) => {
        state.isOpen = payload;
    }),

    setInputValue: action((state, payload) => {
        state.inputValue = payload;
    }),

    setWord: action((state, payload) => {
        state.word = payload;
    }),

    setWords: action((state, payload) => {
        state.words = payload;
        localStorage.setItem("words", JSON.stringify(payload));
    }),

    addWord: action((state) => {
        const trimmed = state.inputValue.trim();
        if (trimmed === "") return;

        const newId = String(state.words.length + 1);
        const newWord = {
            _id: newId,
            content: trimmed,
            stage: "new",
        };

        state.words.push(newWord);
        state.word = trimmed;
        state.inputValue = "";

        localStorage.setItem("words", JSON.stringify(state.words));
    }),

    updateWordStage: action((state, newColumns) => {
        // Flatten tất cả các cột thành một mảng duy nhất (giữ thứ tự từng cột)
        const merged = Object.values(newColumns).flat();
        state.words = merged;

        localStorage.setItem("words", JSON.stringify(merged));
    }),

    removeWord: action((state, id) => {
        const updatedWords = state.words.filter((word) => word._id !== id);
        state.words = updatedWords;
        localStorage.setItem("words", JSON.stringify(updatedWords));
    }),

    clearWords: action((state) => {
        state.words = [];
        localStorage.setItem("words", JSON.stringify([]));
    }),

    updateDefinition: action((state, payload) => {
        const { id, definition } = payload;
        const index = state.words.findIndex((word) => word._id === id);
        if (index !== -1) {
            state.words[index].definition = definition;
            localStorage.setItem("words", JSON.stringify(state.words));
        }
    }),
};

const store = createStore<StoreModel>(storeModel);
export default store;
