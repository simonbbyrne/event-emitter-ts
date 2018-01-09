
export class EventEmitter {
    /**
     * map of events and associated listeners
     */
    private listeners: { [key: string]: any } = {};

    /**
     * Adds the listener function to the end of the listeners array for
     * the event named eventName
     * @param eventName The name of the event
     * @param listener The callback function
     */
    on(eventName: string, listener: (...args: any[]) => void) {
        (this.listeners[eventName] || (this.listeners[eventName] = [])).push(listener);
        return () => { this.removeListener(eventName, listener); };
    }

    /**
     * Removes the specified listener from the listener arra for the 
     * event named eventName
     * @param eventName The name of the event
     * @param listener The callback function
     */
    removeListener(eventName: string, listener: (...args: any[]) => void) {
        const handlers = this.listeners[eventName];
        if (handlers) {
            handlers.splice(handlers.indexOf(listener), 1);
            if (handlers.length == 0) {
                delete this.listeners[eventName];
            }
        }
    }

    /**
     * Adds a one-time listener function for the event named eventName.
     * When eventName is triggered, the listener is removed
     * @param eventName The name of the event
     * @param listener The callback function
     */
    once(eventName: string, listener: (...args: any[]) => void) {
        const callOnce = (...args: any[]) => {
            this.removeListener(eventName, callOnce);
            return listener.apply(this, args);
        }
        this.on(eventName, callOnce);
    }

    /**
     * Synchronously calls each of the listeners registered for the event named eventName
     * in the order they were registered, passing the supplied arguments to each.
     * @param eventName The name of the event
     * @param args 
     */
    emit(eventName: any, ...args: any[]) {
        const handlers = this.listeners[eventName];
        if (handlers) {
            for (let i = 0, n = handlers.length; i < n; i++) {
                handlers[i].apply(this, args);
            }
        }
    }
}