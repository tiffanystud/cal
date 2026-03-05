class Store {
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
        this.lastState = this.state;
        this.state = newState;
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