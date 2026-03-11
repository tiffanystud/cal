import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { EVENTS } from "../store/events.js";

export function initNotificationsService() {
    PubSub.subscribe(EVENTS.REQUEST.SENT.EVENTS.GET, async (payload) => {

        try {
            const resource = await apiRequest({
                entity: "events?eventId=65e10aa11c001",
                method: "GET",
            });

            // PubSub.publish(EVENTS.RESPONSE.RECEIVED.EVENTS.GET);
            // PubSub.publish(EVENTS.RESOURCE.RECEIVED.EVENTS.GET);
            
            if (!store.getState().data.notis) {
                console.log("test");
                store.setState({
                    data: {
                        ...store.getState().data,
                        notis: [resource]
                    }
                });
            } else {
                store.setState({
                    data: {
                        ...store.getState().data,
                        notis: [...store.getState.data.notis, resource]
                    }
                });
            }

            // let currentNotifications = store.getState().data.notis;
            // let newNotis = [...currentNotifications, resource];

            // store.setState({
            //     data: {
            //         ...store.getState().data,
            //         notis: newNotis
            //     }
            // });
            store.notify("notificationsUpdated");
        } catch (e) {
            console.log(e.stack, e.message);
        }
    })

    PubSub.publish(EVENTS.REQUEST.SENT.EVENTS.GET);
}