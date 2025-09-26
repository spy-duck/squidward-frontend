type Listener = () => void
type Unsubscribe = () => void

class CredentialsChangedEventEmitter {
    private listeners: Set<Listener> = new Set()
    
    emit(): void {
        this.listeners.forEach((listener) => listener())
    }
    
    subscribe(listener: Listener): Unsubscribe {
        this.listeners.add(listener)
        return () => {
            this.listeners.delete(listener)
        }
    }
}

export const credentialsChangedEvents = new CredentialsChangedEventEmitter()