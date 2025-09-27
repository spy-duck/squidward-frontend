import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, RESET, useResetAtom } from 'jotai/utils'
import type { TApiToken } from '@squidward/contracts/schemas';

export const actionApiTokenStore = atomWithReset<Partial<TApiToken> | null>(null);
export const useActionApiTokenStore = () => useAtomValue<Partial<TApiToken> | null>(actionApiTokenStore);
export const useSetActionApiTokenStore = () => useSetAtom(actionApiTokenStore);
export const useResetActionApiTokenStore = () => useResetAtom(actionApiTokenStore);


export const isRemoveApiTokenStore = atomWithReset<boolean>(false);
export const useIsRemoveApiTokenStore = () => useAtom<boolean>(isRemoveApiTokenStore);
export const useSetIsRemoveApiTokenStore = () => useSetAtom(isRemoveApiTokenStore);

export const resetApiTokenStore = atom(
    null,
    (get, set) => {
        set(actionApiTokenStore, RESET);
        set(isRemoveApiTokenStore, RESET);
    },
);

export const useResetApiTokenStore = () => useResetAtom(resetApiTokenStore);