import { CreateNotificationsView } from "../views/notifications/notifications.js";

export async function initNotificationsService() {
    let view = new CreateNotificationsView(document.querySelector("#app"));
    await view.render();
}