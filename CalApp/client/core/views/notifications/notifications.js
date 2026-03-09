import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";


export class CreateNotificationsView {
    constructor(root) {
        this.root = root;
    }

    render() {
        PubSub.publish(EVENTS.REQUEST.SENT.EVENTS.GET);
        for (let noti of store.getState().data.notis) {
            let notiCard = document.createElement("notification-card");
            notiCard.data = noti;
            this.root.apppendChild(notiCard);
        }
    }

    subscribeToStore() {
        store.subscribe("notificationsUpdated", (state) => {
            //Do something
        });
    }
}