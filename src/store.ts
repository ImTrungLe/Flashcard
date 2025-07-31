import { action, type Action, createStore } from "easy-peasy";

export interface StoreModel {
    isOpen: boolean;
    handleOpenSidebar: Action<StoreModel>;
    handleCloseSidebar: Action<StoreModel>;
    setOpen: Action<StoreModel, boolean>;
    setClose: Action<StoreModel, boolean>;
}

const storeModel:StoreModel = {
    isOpen: false,

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
    })
};

const store = createStore<StoreModel>(storeModel);
export default store;