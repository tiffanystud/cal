import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { EVENTS } from "../store/events.js";

export function initNotificationsService() {
    PubSub.subscribe(EVENTS.REQUEST.SENT.EVENTS.GET, async () => {
        try {
            let notifications = await apiRequest({
                entity: "events",
                method: "GET"
            });

            PubSub.publish(EVENTS.REQUEST.RECEIVED.GET);
            
            store.setState({notis: notifications});
            store.notify("notis");
        } catch (e) {
            PubSub.publish(EVENTS.REQUEST.ERROR.EVENTS.GET, e);
        }
    })
}

console.log("Noti service loaded");
