/* 
    Stöd vid utveckling: 

    PubSub för UI-events och API-events (dvs. events). 
    Alltså inte UI‑rendering, utan flödet mellan UI -> API -> Store
    Vid ex.: knapptryck, "skicka request"/"response recieved"/"resource hämtad"
        request:sent:events:get / response:received:events:get / resource:received:events:get
*/

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