export class NotificationCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/CalApp/client/views/notifications/components/notification-card.css">

        <h2>${this.data.notiTitle}</h2>
        <div class="noti-body">
            <h3>${this.data.title}</h3>
            <p class="desc">${this.data.desc}</p>
            <p class="location">${this.data.desc}</p>
            <button>View</button>
        </div>
        `
    }
}

customElements.define("notification-card", NotificationCard);