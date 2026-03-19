import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { EVENTS } from "../store/events.js";
import { CreateNotificationsView } from "../views/notifications/notifications.js";

export async function initNotificationsService() {
    let view = new CreateNotificationsView(document.querySelector("#app"));
    await view.render();
}

//initNotificationsService();

console.log("Noti service loaded");
