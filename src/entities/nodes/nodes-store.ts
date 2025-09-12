import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithReset, useResetAtom } from 'jotai/utils'
import type { TNode } from '@swuidward/contracts/schemas';

export const isEditNodeStore = atom<boolean>(false);
export const useIsEditNodeStore = () => useAtom<boolean>(isEditNodeStore);
export const useSetIsEditNodeStore = () => useSetAtom(isEditNodeStore);

export const editNodeStore = atomWithReset<TNode | null>(null);
export const useEditNodeStore = () => useAtomValue<TNode | null>(editNodeStore);
export const useSetEditNodeStore = () => useSetAtom(editNodeStore);
export const useResetEditNodeStore = () => useResetAtom(editNodeStore);
