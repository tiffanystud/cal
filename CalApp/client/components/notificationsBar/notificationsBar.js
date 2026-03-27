import { apiRequest } from "/core/services/api.js";
import { store } from "../../core/store/store.js";
import { NotificationCard } from "/core/views/notifications/components/notification-card.js";

export class NotificationsBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/components/notificationsBar/notificationsBar.css">
        `
        let notifications = store.getState().notis;
        notifications = notifications.filter((x) => x.type === "event");

        notifications = notifications.sort((a, b) => a.notiContent.time.localeCompare(b.notiContent.time));
        notifications = notifications.sort((a, b) => new Date(a.notiContent.date) - new Date(b.notiContent.date));

        let eventNotis;
        if (this.notis) {
            eventNotis = this.notis.filter((x) => x.type === "event");
        } else {
            eventNotis = notifications;
        }

        if (eventNotis.length === 0) {
            this.shadowRoot.innerHTML += "<p>No new notifications!</p>";
            return;
        }

        eventNotis.forEach(async (x) => {
            let event = await apiRequest({
                entity: `events?eventId=${x.eventId}`,
                method: "GET"
            });
            let cal = await apiRequest({
                entity: `calendars?id=${event.calId}`,
                method: "GET"
            });
            let noti = document.createElement("a-notification");
            noti.data = {
                noti: x,
                event: event,
                cal: cal
            };
            this.shadowRoot.appendChild(noti);
        });
    }
}

export class ANotification extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/components/notificationsBar/aNotification.css">
        <div id="read-status"></div>
        <p>New event in: ${this.data.cal.name}</p>
        `

        this.addEventListener("click", (e) => {
            let overlayDiv = document.createElement("div");
            overlayDiv.style.position = "absolute";
            overlayDiv.style.top = "0";
            overlayDiv.style.left = "0";
            overlayDiv.style.backgroundColor = "rgb(0,0,0,0.5)";
            overlayDiv.style.height = "100%";
            overlayDiv.style.width = "100%";
            overlayDiv.style.display = "flex";
            overlayDiv.style.justifyContent = "center";
            overlayDiv.style.alignItems = "center";
            let notiCard = document.createElement("notification-card");
            notiCard.data = this.data;
            overlayDiv.appendChild(notiCard);
            document.querySelector("#app").appendChild(overlayDiv);
        });
    }
}

customElements.define("notifications-bar", NotificationsBar);
customElements.define("a-notification", ANotification);