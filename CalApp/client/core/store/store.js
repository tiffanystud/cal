import { state } from "./state.js";

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

    // Förväntar sig keyName för att kalla på notify internt
    // Förväntar sig data för datan från setState
    
    // Görs om till -> setState (newstate) {}
    setState(newState, responseStatus, eventName, data) {

        // Neka fel format
        if (typeof newState !== "object" || Array.isArray(newState)) {
            return false;
        }

        this.lastState = this._state;
        this._state = Object.assign(this._state, newState);

    
        this.notify(eventName, data);
        /*    Görs om till ->     
            for (let key in neState) {
            this.notify(keyName, newState[keyName])
        } */
       
            
        return { ok: true };

    }

    set state(value) {
        throw new Error("Not allowed");
    }

    // eventName -> keyName
    subscribe(eventName, listener) {
        
        if (!Store.allListeners[eventName]) {
            
            console.log("Hej event ", eventName)
            Store.allListeners[eventName] = []
        };
        
        Store.allListeners[eventName].push(listener);
    }


    // Byt ut till keyName 
    notify(eventName, data) {
        
        if (!Store.allListeners[eventName]) {
            
            return "No listeners for event"
        } else {
            
            Store.allListeners[eventName].forEach(listener => listener(data));
        }
    }
}

export const store = new Store(state);