import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, RESET, useResetAtom } from 'jotai/utils'
import type { THost } from '@squidward/contracts/schemas';

export const isEditHostStore = atomWithReset<boolean>(false);
export const useIsEditHostStore = () => useAtom<boolean>(isEditHostStore);
export const useSetIsEditHostStore = () => useSetAtom(isEditHostStore);

export const actionHostStore = atomWithReset<Partial<THost> | null>(null);
export const useActionHostStore = () => useAtomValue<Partial<THost> | null>(actionHostStore);
export const useSetActionHostStore = () => useSetAtom(actionHostStore);
export const useResetActionHostStore = () => useResetAtom(actionHostStore);


export const isRemoveHostStore = atomWithReset<boolean>(false);
export const useIsRemoveHostStore = () => useAtom<boolean>(isRemoveHostStore);
export const useSetIsRemoveHostStore = () => useSetAtom(isRemoveHostStore);

export const resetHostStore = atom(
    null,
    (get, set) => {
        set(actionHostStore, RESET);
        set(isRemoveHostStore, RESET);
        set(isEditHostStore, RESET);
    },
);

export const useResetHostStore = () => useResetAtom(resetHostStore);