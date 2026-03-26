
export class Pubsub {
    
    constructor() {
        this.events = {};
    }

    subscribe(event, callBack) {
    
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(callBack);

        // Unsubscribe
        return () => {
            this.events[event] = this.events[event].filter(eventCallback => eventCallback != callBack);
        }
    }

    publish(event, data = null) {
        
        if (!this.events[event]) {
            return;
        }

        for (let callBack of this.events[event]) {
            callBack(data);
        }
    }

}

export const PubSub = new Pubsub();