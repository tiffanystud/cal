class Store {
    static allStates = [];
    constructor(initialState) {
        this.state = initialState;
        Store.allStates.push(this.state);
        this.listeners = []; 
    }
    getState() {
        return structuredClone(this.state);
    }
    setState(newState) {
        this.state = newState;
        this.notify();
    }
    subscribe(listener) {
        this.listeners.push(listener); 
    }
    notify() {
        this.listeners.forEach(listener => listener());
    }
}