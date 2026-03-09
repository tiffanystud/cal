
import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { Store } from "../store/store.js";
import { EVENTS } from "../store/events.js";

console.log("Calendar service loaded");

export function initCalendarService() {
    // catch event: "request:sent:calendars:post"
    PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.POST, async function (payload) {

        console.log("EVENT RECEIVED", payload);

        try {

            // Skicka request data och payload till api.js
            const response = await apiRequest({
                entity: "calendars",
                method: "POST",
                body: payload
            });

            // Publish att response och resource är recieved 
            PubSub.publish(EVENTS.RESPONSE.RECEIVED.CALENDARS.POST, response)
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.POST, response)

            // Se över store objektet
            const currCals = Store.getState().data.cals;
            const newCals = [...currCals, response];

            // Uppdatera state
            Store.setState({
                data: {
                    ...Store.getState().data,
                    cals: newCals
                }
            });

            // Efterr setSStatte alltid notis på vad som hänt
            Store.notify("calendarsUpdated");

        } catch {

            // console.log

        }

    })
}