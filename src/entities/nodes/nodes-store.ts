import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, RESET, useResetAtom } from 'jotai/utils'
import type { TNode } from '@squidward/contracts/schemas';

export const isEditNodeStore = atomWithReset<boolean>(false);
export const useIsEditNodeStore = () => useAtom<boolean>(isEditNodeStore);
export const useSetIsEditNodeStore = () => useSetAtom(isEditNodeStore);

export const actionNodeStore = atomWithReset<Partial<TNode> | null>(null);
export const useActionNodeStore = () => useAtomValue<Partial<TNode> | null>(actionNodeStore);
export const useSetActionNodeStore = () => useSetAtom(actionNodeStore);
export const useResetActionNodeStore = () => useResetAtom(actionNodeStore);


export const isRemoveNodeStore = atomWithReset<boolean>(false);
export const useIsRemoveNodeStore = () => useAtom<boolean>(isRemoveNodeStore);
export const useSetIsRemoveNodeStore = () => useSetAtom(isRemoveNodeStore);

export const resetNodeStore = atom(
    null,
    (get, set) => {
        set(actionNodeStore, RESET);
        set(isRemoveNodeStore, RESET);
        set(isEditNodeStore, RESET);
    },
);

export const useResetNodeStore = () => useResetAtom(resetNodeStore);