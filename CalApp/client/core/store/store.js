
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
    
    // responseStatus för att säkerställa att DB uppdateras innan state 
    setState(newState, responseStatus) {
        
        // Neka fel format
        if (typeof newState !== "object" || Array.isArray(newState)) {
            return false;
        }
        
        // Notify status om !ok notify redan här
        
        
        this.lastState = this._state;
        // target, source (shallow merge?) OBS->->-> gör om
        this._state = Object.assign(this._state, newState);
        
        
    }
    
    set state(value) {
        throw new Error("Not allowed");
    }
    
    subscribe(eventName, listener) {
        if (!Store.allListeners[eventName]) Store.allListeners[eventName] = [];
        Store.allListeners[eventName].push(listener);
    }
    
    // skicka event OBS->->-> gör detta varje gång estState är utfört
    notify(eventName) {
        if (!Store.allListeners[eventName]) {
            return "No listeners for event"
        } else {
            Store.allListeners[eventName].forEach(listener => listener(this._state));
        }
    }
}

// ?
export const store = new Store({
    notis: []
});