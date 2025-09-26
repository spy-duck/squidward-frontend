import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, RESET, useResetAtom } from 'jotai/utils'
import type { TUser } from '@squidward/contracts/schemas';

export const isEditUserStore = atomWithReset<boolean>(false);
export const useIsEditUserStore = () => useAtom<boolean>(isEditUserStore);
export const useSetIsEditUserStore = () => useSetAtom(isEditUserStore);

export const actionUserStore = atomWithReset<Partial<TUser> | null>(null);
export const useActionUserStore = () => useAtomValue<Partial<TUser> | null>(actionUserStore);
export const useSetActionUserStore = () => useSetAtom(actionUserStore);
export const useResetActionUserStore = () => useResetAtom(actionUserStore);


export const isRemoveUserStore = atomWithReset<boolean>(false);
export const useIsRemoveUserStore = () => useAtom<boolean>(isRemoveUserStore);
export const useSetIsRemoveUserStore = () => useSetAtom(isRemoveUserStore);

export const resetUserStore = atom(
    null,
    (get, set) => {
        set(actionUserStore, RESET);
        set(isRemoveUserStore, RESET);
        set(isEditUserStore, RESET);
    },
);

export const useResetUserStore = () => useResetAtom(resetUserStore);