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
        this.state = initialState;
        this.lastState = null;
        Store.allStates.push(this.state)
    }
    
    getState() {
        return structuredClone(this.state);
    }
    
    setState(newState) {
        if (typeof newState !== "object" || Array.isArray(newState)) {
            return false;
        }
        this.lastState = this.state;
        this.state = Object.assign(this.state, newState);
    }
    
    set state(value) {
        throw new Error("Not allowed");
    }
    
    subscribe(eventName, listener) {
        if (!Store.allListeners[eventName]) Store.allListeners[eventName] = [];
        Store.allListeners[eventName].push(listener);
    }
    
    notify(eventName) {
        Store.allListeners[eventName].forEach(listener => listener(this.state));
    }
}