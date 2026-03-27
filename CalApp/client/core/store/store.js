
import { state } from "./state.js";
import { stateSchema } from "./state.js";

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


    // Expects: {key1: callback1, key2: callback2...}, supports multiple keys
    setState(newState) {

        // Reject invalid format
        if (typeof newState !== "object" || Array.isArray(newState)) {
            return false;
        }

        this.lastState = this._state;
        this._state = Object.assign(this._state, newState);

        // Notify about state change per key
        for (let keyName in newState) {
            this.notify(keyName, newState[keyName]);
        }

        return { ok: true };

    }

    set state(value) {
        throw new Error("Not allowed");
    }

    subscribe(keyName, listener) {

        if (!Store.allListeners[keyName]) {

            Store.allListeners[keyName] = []

        };

        Store.allListeners[keyName].push(listener);
    }

    notify(keyName, data) {

        if (!Store.allListeners[keyName]) {

            return "No listeners for event"

        } else {

            Store.allListeners[keyName].forEach(listener => listener(data));
        }
    }


    // Reset state.js (if user logs ut etc)
    resetState() {

        this._state = structuredClone(stateSchema);

        // Notify about state change per key
        for (let keyName in this._state) {
            this.notify(keyName, this._state[keyName]);
        }

    }

}

export const store = new Store(state);

