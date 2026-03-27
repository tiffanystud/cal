import { store } from "../../../store/store.js";
import { PubSub } from "../../../store/pubsub.js";

export class EventCard extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.events = [];
        this.selectedTags = [];

        store.subscribe("selectedEvents", (data) => {
            this.events = data;
            this.render();
            this.eventListeners();
        })
        
    }



    html() {
        const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const months = ["January", "February", "March", "April", "May", "July", "July", "August", "September", "October", "November", "December"];

        // const infoForEvent = `
        //     <p>Kommande evenemang</p>
        //     <p>${months[date.getMonth()]}</p>`;
        const currentDate = new Date();

        let monthElements = {}
        const eventsContainer = document.createElement("div");
        eventsContainer.id = "events";

        for (let event of this.events) {
            const date = new Date(event.date);
            // Denna kollar antingen eller, men till sen, ändra så det kontrollerar att båda stämmer, månad och datum
            // if (date.getMonth() == currentDate.getMonth()) {

            if (!monthElements[date.getMonth()]) {
                const monthDiv = document.createElement("div");
                monthDiv.id = `month-${date.getMonth()}`
                monthDiv.classList.add("events");
                monthDiv.innerHTML = `<p>${months[date.getMonth()]}</p>`;
                eventsContainer.appendChild(monthDiv);
                monthElements[date.getMonth()] = monthDiv;
            }

            let monthDiv = monthElements[date.getMonth()];
            monthDiv.innerHTML += `
                    <div class="eventCardOuter" id="${event.id}">
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
                ` ;
            // }
        }
        // VARFÖR INNERHTML OCH INTE BARA EVENTS!?!?
        return eventsContainer.innerHTML;

    }


    style() {
        return `
        <style>
            .events {
                display: flex;
                flex-direction: column;
                gap: 20px;
            }
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
                cursor: pointer;
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
            .eventInfo p: first-child {
                font-size: 16px;
            }
        </style>
                `;
    }

    eventListeners() {
        let allEventCards = this.shadowRoot.querySelectorAll(".eventCardOuter");

        for (let eventCard of allEventCards) {
            eventCard.addEventListener("click", () => {
                PubSub.publish("EVENT.RESOURCE", store.getState().selectedEvents.find(event => event.id == eventCard.id));
            })
        }

    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            ${this.html()}

   
            `
    }

}

customElements.define("event-cards", EventCard);