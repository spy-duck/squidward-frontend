import { atomWithStorage } from 'jotai/utils'
import { useAtomValue, useSetAtom } from 'jotai';

const SessionStore = atomWithStorage<string | null>('session', null);

export const useSessionToken = () => useAtomValue(SessionStore);
export const useSetSession = () => useSetAtom(SessionStore);

