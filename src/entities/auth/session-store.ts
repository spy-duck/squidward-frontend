import { atomWithStorage } from 'jotai/utils'
import { useAtomValue, useSetAtom } from 'jotai';
import { SESSION_STORAGE_KEY } from '@/shared/constants/auth/auth';

const SessionStore = atomWithStorage<string | null>(SESSION_STORAGE_KEY, null);

export const useSessionToken = () => useAtomValue(SessionStore);
export const useSetSession = () => useSetAtom(SessionStore);

