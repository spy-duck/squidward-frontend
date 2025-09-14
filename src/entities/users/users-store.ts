import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils'
import type { TUser } from '@swuidward/contracts/schemas';

export const isEditUserStore = atom<boolean>(false);
export const useIsEditUserStore = () => useAtom<boolean>(isEditUserStore);
export const useSetIsEditUserStore = () => useSetAtom(isEditUserStore);

export const actionUserStore = atomWithReset<Partial<TUser> | null>(null);
export const useActionUserStore = () => useAtomValue<Partial<TUser> | null>(actionUserStore);
export const useSetActionUserStore = () => useSetAtom(actionUserStore);
export const useResetActionUserStore = () => useResetAtom(actionUserStore);


export const isRemoveUserStore = atom<boolean>(false);
export const useIsRemoveUserStore = () => useAtom<boolean>(isRemoveUserStore);
export const useSetIsRemoveUserStore = () => useSetAtom(isRemoveUserStore);
