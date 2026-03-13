export class NotificationCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/core/views/notifications/components/notification-card.css">

        <h2>Title</h2>
        <div class="noti-body">
            <h3>${this.data.name}</h3>
            <p class="desc">${this.data.description}</p>
            <p class="location">${this.data.location}</p>
            <button>View</button>
        </div>
        `
    }
}