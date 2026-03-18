import { store } from "../../../store/store.js";

export class EventCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.events = [];

        store.subscribe("calendar:events", (data) => {
            console.log("omg");
            this.events = data.calEvents;
            this.render();
        })
        console.log(this.events);
    }



    html() {
        const days = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
        const months = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];



        // const infoForEvent = `
        //     <p>Kommande evenemang</p>
        //     <p>${months[date.getMonth()]}</p>`;
        let allHtml = "";
        for (let event of this.events) {
            const date = new Date(event.date);
            allHtml += `

            <div class="eventCardOuter">
            <div class="imgCont">Image here</div>
                <div class="eventDesc"> 
                    <div class="date">
                        <p>${days[date.getDay()]}</p>
                        <p>${date.getDate()}</p>
                    </div>
                    <div class="eventInfo">
                        <p>${event.name}</p>
                        <p>${event.location}</p>
                    </div>
                </div>
            </div>
             `;
        }
        return allHtml;
    }

    // return htmlCode;



    style() {
        return `
        <style>
            .imgCont {
                background-color: beige;
                height: 50px;
            }
            .eventCardOuter {
                display: flex;
                flex-direction: column;
                background-color: white;
                border-radius: 10px;
                overflow: hidden;
            }
            .eventDesc {
               display: flex;
               gap: 30px;
                padding: 5px;
                height: 75px;
            }
            p {
                margin: 0;
            }
            .date {
                display: flex;
                align-items: center;
                flex-direction: column;
                gap: 10px;
            }
            .eventInfo {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            .eventInfo p:first-child {
                font-size: 16px;
            }
        </style>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            <div class="events">
                  ${this.html()}
            </div>
        `
    }

}

customElements.define("event-cards", EventCard);