function createStore(initialState) {
    let state = initialState;
    const listeners = {};

    function getState() {
        return state;
    }

    function setState(newState, funcs = []) {
        state = newState;
        if (funcs.length !== 0) {
            funcs.forEach((x) => {
                listeners[x](state);
            });
        } else {
            for (let key in listeners) {
                listeners[key](state);
            }
        }
    }

    function subscribe(name, listener) {
        listeners[name] = listener;
    }

    return {
        getState,
        setState,
        subscribe
    };
}