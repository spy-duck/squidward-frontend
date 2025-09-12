import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils'
import type { TNode } from '@swuidward/contracts/schemas';

export const isEditNodeStore = atom<boolean>(false);
export const useIsEditNodeStore = () => useAtom<boolean>(isEditNodeStore);
export const useSetIsEditNodeStore = () => useSetAtom(isEditNodeStore);

export const actionNodeStore = atomWithReset<TNode | null>(null);
export const useActionNodeStore = () => useAtomValue<TNode | null>(actionNodeStore);
export const useSetActionNodeStore = () => useSetAtom(actionNodeStore);
export const useResetActionNodeStore = () => useResetAtom(actionNodeStore);


export const isRemoveNodeStore = atom<boolean>(false);
export const useIsRemoveNodeStore = () => useAtom<boolean>(isRemoveNodeStore);
export const useSetIsRemoveNodeStore = () => useSetAtom(isRemoveNodeStore);
