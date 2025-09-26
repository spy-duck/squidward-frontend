import type { AxiosResponse } from 'axios';

type Listener = (axiosResponse: AxiosResponse) => void
type Unsubscribe = () => void

class LogoutEventEmitter {
    private listeners: Set<Listener> = new Set()
    
    emit(axiosResponse: AxiosResponse): void {
        this.listeners.forEach((listener) => listener(axiosResponse))
    }
    
    subscribe(listener: Listener): Unsubscribe {
        this.listeners.add(listener)
        return () => {
            this.listeners.delete(listener)
        }
    }
}

export const logoutEvents = new LogoutEventEmitter()