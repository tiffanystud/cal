class EventCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();

        store.subscribe("request:sent:calendarsevents:get", function (event) {
            this.render(event)
        })

    }

    html(event) {
        const date = new Date(event.date);
        const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

        if (event.length < 0) {
            return `
            <div id="eventDesc">
                <p>Calendars doesent have any events</p>
            </div>
            `;
        }

        let htmlCode;

        for (let card of event) {
            html += `
            < div id = "image" >
            </div >
                <div id="eventDesc">
                    <div id="date">
                        <p>${days[date.getDay()]}</p>
                        <p>${date.getDate()}</p>
                    </div>
                    <div id="eventInfo">
                        <p>${card.name}</p>
                        <p>${card.location}</p>
                    </div>
                </div>
            `;
        }

        return htmlCode;

    }

    style() {
        return `
            #eventDesc {
                display: flex;
            }
            #date {
                display: flex;
                flex - direction: column;
                justify - content: center;
                align - items: center;
            }
            #eventInfo {
                display: flex;
                flex - direction: column;
                justify - content: center;
                align - items: center;
            }
            `;
    }

    render(event) {
        this.shadowRoot.innerHTML = `
            ${this.html(event)}
            ${this.style()}
            `
    }

}