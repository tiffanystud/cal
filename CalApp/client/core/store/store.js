
import { apiRequest } from "../services/api.js";
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
        for(let keyName in newState) {
            this.notify(keyName, newState[keyName]);
        }

        return {ok: true};

    }

    set state(value) {
        throw new Error("Not allowed");
    }
    
    subscribe(keyName, listener) {
        
        if (!Store.allListeners[keyName]) {
            
            console.log('New subscription: "', keyName, '" with listener: "', listener, '"');
            Store.allListeners[keyName] = []
            
        };
        
        Store.allListeners[keyName].push(listener);
    }

    notify(keyName, data) {
        
        if (!Store.allListeners[keyName]) {
            
            return "No listeners for event"
        } else {

            console.log('New nofify: "', keyName, '" with: "', data, '"');
            Store.allListeners[keyName].forEach(listener => listener(data))
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
    
    async loadState(userId) {

        // User
        const currUser = await apiRequest({
            entity: `users?id=${userId}`,
            method: "GET"
        });

        // UPDATE STATE
        this.setState({
            isLoggedIn: {
                id: currUser.id,
                username: currUser.name,
                email: currUser.email
            }
        });

        // Get User Groups (UG)
        const usergroups = await apiRequest({
            entity: `users_calendars?userId=${userId}`,
            method: "GET"
        });
        
        // Get Friends
        const friends = await apiRequest({
            entity: `friendships?userId=${userId}`,
            method: "GET"
        });

        // Get Private MSG
        const privateMessages = await apiRequest({
            entity: `private_msg?userId=${userId}`,
            method: "GET"
        });

        // Get Calendar MSG
        const calendarMessages = [];
        for (let ug of usergroups) {
            const msgs = await apiRequest({
                entity: `calendar_msg?senderId=${userId}&calId=${ug.calId}`,
                method: "GET"
            });

            for (let msg of msgs) {
                calendarMessages.push(msg);
            }
        }

        // Get Pinned cals
        const pinned = await apiRequest({
            entity: `users_pinned_calenders?userId=${userId}`,
            method: "GET"
        });

        // Get Avails
        const availabilities = await apiRequest({
            entity: `users_availabilities?userId=${userId}`,
            method: "GET"
        });
        
        // Get Calendars (based on UG)
        const calIds = [];
        for (let ug of usergroups) {
            calIds.push(ug.calId);
        }
        
        const cals = [];
        for (let calId of calIds) {
            const cal = await apiRequest({
                entity: `calendars?id=${calId}`,
                method: "GET"
            });
            cals.push(cal);
        }

        // Get Events (based on cals)
        let events = [];
        for (let calId of calIds) {

            const eventsForCal = await apiRequest({
                entity: `events?calId=${calId}`,
                method: "GET"
            });

            for (let event of eventsForCal) {
                events.push(event);
            }
        }

        // UPDATE STATE
        this.setState({
            usergroups: usergroups,
            cals: cals,
            events: events,
            friends: friends,
            privateMessages: privateMessages,
            calendarMessages: calendarMessages,
            userPinnedCalendars: pinned,
            availabilites: availabilities
        });

    }
    
}

export const store = new Store(state);