/* 
    Stöd vid utveckling: 

    store.js - vid api response
    - Uppdatera store, ex.: store.notify("eventsUppdated");
    - notify vid state change (ej som PubSub är vid events)
*/

export class Store {
    
    static allStates = [];
    static allListeners = {};
    
    constructor(initialState) {
        this._state = initialState;
        this.lastState = null;
        Store.allStates.push(this._state)
    }
    
    getState() {
        return structuredClone(this._state);
    }
    
    setState(newState) {
        
        // Neka fel format
        if (typeof newState !== "object" || Array.isArray(newState)) {
            return false;
        }
        
        this.lastState = this._state;
        // target, source (shallow merge?)
        this._state = Object.assign(this._state, newState);
    }
    
    set state(value) {
        throw new Error("Not allowed");
    }
    
    subscribe(eventName, listener) {
        if (!Store.allListeners[eventName]) Store.allListeners[eventName] = [];
        Store.allListeners[eventName].push(listener);
    }
    
    // skicka event
    notify(eventName) {
        if (!Store.allListeners[eventName]) {
            return "No listeners for event"
        } else {
            Store.allListeners[eventName].forEach(listener => listener(this._state));
        }
    }
}

export const store = new Store({
    data: {

    }
});