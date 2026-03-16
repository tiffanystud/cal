import { state } from "../../../store/state.js"


export class EventCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();

        // store.subscribe("request:sent:calendarsevents:get", function (event) {
        //     this.render(event)
        // })

    }

    html() {
        const event = state.userData.events;
        const date = new Date(event.date);
        const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
        const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
        // if (event.length < 0) {
        //     return `
        //     <div id="eventDesc">
        //         <p>Calendars doesent have any events</p>
        //     </div>
        //     `;
        // }

        let htmlCode;

        // for (let card of event) {
        // html += `
        return `
        <p>Kommande evenemang</p>
        <p>${months[date.getMonth()]}</p>

        <div id="eventCardOuter">
            <div id="imgCont">Image here</div>
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
        </div>
        `;
    }

    // return htmlCode;



    style() {
        return `
        <style>
            #imgCont {
                background-color: beige;
                height: 50px;
            }
            #eventCardOuter {
                display: flex;
                flex-direction: column;
                background-color: white;
                border-radius: 10px;
                overflow: hidden;
            }
            #eventDesc {
               display: flex;
               gap: 30px;
                padding: 5px;
                height: 75px;
            }
            p {
                margin: 0;
            }
            #date {
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 10px;
            }
            #eventInfo {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            #eventInfo p:first-child {
                font-size: 16px;
            }
        </style>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.html()}
            ${this.style()}
        `
    }

}

customElements.define("event-cards", EventCard);