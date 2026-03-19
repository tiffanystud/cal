import { apiRequest } from "../../../services/api.js";

export class NotificationCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    async connectedCallback() {
        this.notiId = this.data.id;
        if (this.type === "event") {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/core/views/notifications/components/notification-card.css">

            <h2>New event<img src="/assets/icons/x-close-dark.png"></h2>
            <div class="noti-body">
                <h3>${this.data.name}<p>${this.data.date}, ${this.data.time}</p></h3>
                <p class="desc">${this.data.description}</p>
                <p class="location">Location: ${this.data.location} <button>View →</button></p>
            </div>
            `;
        } else if (this.type === "message") {
            if (this.data.calId) {
                this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/core/views/notifications/components/notification-card.css">

                <h2>New message<img src="/assets/icons/x-close-dark.png"></h2>
                <div class="noti-body">
                    <h3>From: ${this.sender.name}<p>${this.data.date}, ${this.data.time}</p></h3>
                    <p class="desc">${this.data.content}</p>
                    <p class="location">Calendar: ${this.cal.name}<button>View →</button></p>
                </div>
                `;
            } else if (this.data.receiverId) {
                this.shadowRoot.innerHTML = `
                <link rel="stylesheet" href="/core/views/notifications/components/notification-card.css">

                <h2>New private message<img src="/assets/icons/x-close-dark.png"></h2>
                <div class="noti-body">
                        <h3>From: ${this.sender.name}<p>${this.data.date}, ${this.data.time}</p></h3>
                    <p class="desc">${this.data.content}</p>
                    <p class="location">Private message<button>View →</button></p>
                </div>
                `;
            }
        }

        if (!this.data.read) {
            this.shadowRoot.querySelector("h2").style.backgroundColor = "crimson";
        }

        this.shadowRoot.querySelector("img").addEventListener("click", () => {
            console.log("//Send DELETE-request and delete noti if successfull");
            this.remove();
        });
        this.shadowRoot.querySelector("button").addEventListener("click", () => {
            console.log("//Link to notification source");
        });
    }

    async errorMsg(type, resp) {
        let reso = await resp.json();
        if (type === "network") {
            this.root.innerHTML = `
            <p>Network error, server unreachable</p>
            `
        } else {
            this.root.innerHTML = `
            <p>Status: ${resp.status}<br>${reso.error}</p>
            `
        }
    }
}

customElements.define("notification-card", NotificationCard);