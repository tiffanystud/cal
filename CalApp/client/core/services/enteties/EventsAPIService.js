import { store } from "../../store/Store.js";
import { apiRequest } from "../ApiService";
import { PubSub } from "../../store/Pubsub.js";
import { EVENTS } from "../../store/Events.js";

// Denna service kan användas för att bearbeta event beroende på view och komponenter som berör events 
class EventsAPIService {

    constructor() {
        this.subs();
    }

    // Kolla över eventen här också i alla delar, osäker om eventen hör till rätt del

    subs() {
        // Dessa pubbar lyssnar på eventen som skickas från servicen i views
        PubSub.subscribe(EVENTS.REQUEST.SENT.EVENTS.GET, (data) => {
            this.GET();
        })
        PubSub.subscribe(EVENTS.REQUEST.SENT.EVENTS.POST, (data) => {
            this.POST(data);
        })
        PubSub.subscribe(EVENTS.REQUEST.SENT.EVENTS.PATCH, (data) => {
            this.PATCH(data);
        })
        PubSub.subscribe(EVENTS.REQUEST.SENT.EVENTS.DELETE, (data) => {
            this.DELETE(data);
        })
    }

    sendErrorMSG() {
        return { error: "Something went wrong." };
    }

    // Metoderna använder ApiService för att fetcha datan och ändrar state samtidigt

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

        if (!newEvent) {
            PubSub.publish(EVENTS.REQUEST.ERROR.EVENTS.POST);
            return this.sendErrorMSG();
        }



        try {
            let postEvent = apiRequest({ entity: "events", method: "POST", body: newEvent });

            // Set correct EVENT
            PubSub.publish(EVENTS.DATA.UPDATED.EVENTS, {
                entity: "events",
                method: "created",
                responseData: postEvent,
            });

        } catch (responseMessage) {
            PubSub.publish(EVENTS.RESPONSE.ERROR.EVENTS.POST, { message: responseMessage });
        }

    }

    PATCH(editedEvent) {

        try {
            let patchEvent = apiRequest({ entity: "events", method: "PATCH", body: editedEvent });

            PubSub.publish(EVENTS.DATA.UPDATED.EVENTS, {
                entity: "events",
                method: "changed",
                responseData: patchEvent,
            });

            // PubSub.publish(EVENTS.RESPONSE.SENT.PATCH, true);

        } catch (responseMessage) {
            PubSub.publish(EVENTS.RESPONSE.ERROR.EVENTS.PATCH, { message: responseMessage });
        }
    }

    DELETE(selectedEvent) {

        try {
            let deleteEvent = apiRequest({ entity: "events", method: "DELETE", body: selectedEvent })

            PubSub.publish(EVENTS.DATA.UPDATED.EVENTS, {
                entity: "events",
                method: "deleted",
                responseData: deleteEvent,
            });


        } catch (responseMessage) {
            PubSub.publish(EVENTS.RESPONSE.ERROR.EVENTS.DELETE, { message: responseMessage });
            
        }

    }


}

new EventsAPIService();

