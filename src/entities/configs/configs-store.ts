import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, RESET, useResetAtom } from 'jotai/utils'
import type { TConfig } from '@squidward/contracts/schemas';

export const isEditConfigStore = atomWithReset<boolean>(false);
export const useIsEditConfigStore = () => useAtom<boolean>(isEditConfigStore);
export const useSetIsEditConfigStore = () => useSetAtom(isEditConfigStore);

export const actionConfigStore = atomWithReset<Partial<TConfig> | null>(null);
export const useActionConfigStore = () => useAtomValue<Partial<TConfig> | null>(actionConfigStore);
export const useSetActionConfigStore = () => useSetAtom(actionConfigStore);
export const useResetActionConfigStore = () => useResetAtom(actionConfigStore);


export const isRemoveConfigStore = atomWithReset<boolean>(false);
export const useIsRemoveConfigStore = () => useAtom<boolean>(isRemoveConfigStore);
export const useSetIsRemoveConfigStore = () => useSetAtom(isRemoveConfigStore);

export const resetConfigStore = atom(
    null,
    (get, set) => {
        set(actionConfigStore, RESET);
        set(isRemoveConfigStore, RESET);
        set(isEditConfigStore, RESET);
    },
);

export const useResetConfigStore = () => useResetAtom(resetConfigStore);