import { store } from "../../store/Store.js";
import { apiRequest } from "../ApiService";
import { PubSub } from "../../store/Pubsub.js";
import { EVENTS } from "../../store/Events.js";

class EventsAPIService {

    constructor() {
        this.subs();
    }
    
    // Kolla över eventen här också i alla delar, osäker om eventen hör till rätt del

    subs() {
        PubSub.subscribe(REQUEST.SENT.EVENTS.GET, (data) => {
            this.GET();
        })
        PubSub.subscribe(REQUEST.SENT.EVENTS.POST, (data) => {
            this.POST(data);
        })
        PubSub.subscribe(REQUEST.SENT.EVENTS.PATCH, (data) => {
            this.PATCH(data);
        })
        PubSub.subscribe(REQUEST.SENT.EVENTS.DELETE, (data) => {
            this.DELETE(data);
        })
    }

    GET() {
        let newIncomingEvents = [];

        for (let cal of store.getState().cals) {
            try {
                // let event = await fetch(`http://localhost:8000/${cal.id}`);
                // if (event.calId != cal.id) {
                //     newIncomingEvents.push(event);
                // }
                let event = apiRequest({ entity: `events?${cal.id}`, method: "GET" });
                if (event.calId != cal.id) {
                    newIncomingEvents.push(event);
                }
            } catch (responseMessage) {
                // Vad kan man ha här i catch?
                PubSub.publish(EVENTS.RESPONSE.ERROR.EVENTS.GET, { message: responseMessage });
            }
        }
        if (newIncomingEvents.length > 0) {
            let state = store.getState();
            for (let newEvent of newIncomingEvents) {
                state.events.push(newEvent);
            }
            store.setState(state);
            PubSub.publish(EVENTS.RESPONSE.SENT.GET);
        }
    }

    POST(newEvent) {

        try {
            // let postEvent = await fetch(`http://localhost:8000`, {
            //     method: "POST",
            //     body: JSON.stringify({ newEvent }),
            //     headers: { "Content-Type": "application/json" }
            // })
            // if (postEvent.status == 400) {

            // } else {
            //     store.setState(newEvent);
            // }

            let postEvent = apiRequest({ entity: "events", method: "POST", body: newEvent });
            let state = store.getState();
            state.events.push(postEvent);
            store.setState(state);
            PubSub.publish(EVENTS.RESPONSE.SENT.POST, true);

        } catch (responseMessage) {
            PubSub.publish(EVENTS.RESPONSE.ERROR.EVENTS.POST, { message: responseMessage });
        }

    }

    PATCH(editedEvent) {

        try {
            let patchEvent = apiRequest({ entity: "events", method: "PATCH", body: editedEven });
            let state = store.getState();
            state.events.filter(event => event.id != editedEvent.id);
            state.events.push(patchEvent);
            store.setState(state);
            PubSub.publish(EVENTS.RESPONSE.SENT.PATCH, true);

        } catch (responseMessage) {
            PubSub.publish(EVENTS.RESPONSE.ERROR.EVENTS.PATCH, { message: responseMessage });
        }
    }

    DELETE(selectedEvent) {

        try {
            let deleteEvent = apiRequest({ entity: "events", method: "DELETE", body: selectedEvent })
            let state = store.getState();
            state.events.filter(event => event.id != selectedEvent.id);
            store.setState(state);
            PubSub.publish(EVENTS.RESPONSE.SENT.DELETE, true);

        } catch (responseMessage) {
            PubSub.publish(EVENTS.RESPONSE.ERROR.EVENTS.DELETE, { message: responseMessage });
        }

    }


}

new EventsAPIService();

