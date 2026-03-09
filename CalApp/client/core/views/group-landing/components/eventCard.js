class EventCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    html() {
        const event = state.userData.events
        const date = new Date(event.date);
        const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"]

        return `
            <div id="image">
            </div>
            <div id="eventDesc">
                <div id="date">
                    <p>${days[date.getDay()]}</p>
                    <p>${date.getDate()}</p>
                </div>
                <div id="eventInfo">
                    <p>${event.name}</p>
                    <p>${event.location}</p>
                </div>
            </div>
        `;

    }

    style() {
        return `
            #eventDesc {
                display: flex;
            }
            #date {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            #eventInfo {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.html()}
            ${this.style()}
        `
    }

}