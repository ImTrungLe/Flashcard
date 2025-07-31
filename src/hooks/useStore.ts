// src/hooks/useStore.ts
import { useStoreActions as useStoreActionsBase, useStoreState as useStoreStateBase } from 'easy-peasy';
import { type StoreModel } from '../store';

export const useStoreState = useStoreStateBase<StoreModel>;
export const useStoreActions = useStoreActionsBase<StoreModel>;
