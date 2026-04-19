import { store } from "../../../store/Store.js";
import { PubSub } from "../../../store/Pubsub.js";
import { EVENTS } from "../../../store/Events.js";

class EventInfo extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: open });
        this.eventData;
    }

    connectedCallback() {
        this.subs();
        this.render();
        this.eListeners();
    }

    disconnectedCallback() {
        // Unsubscriba ??
    }

    subs() {

        PubSub.subscribe(EVENTS.DATA, (data) => {
            this.eventData = data;
        })

    }

    getValue() {

    }

    setValue() {

    }

    eListeners() {

    }

    dateLogic(method) {
        let date = new Date(this.eventData.date);

        if (method == "day") {
            let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            return days[date.getDay()];
        } else if (method == "date") {
            return date.getDate();
        } else if (method == "month") {
            let months = ["January", "Februari", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"];
            return months[date.getMonth()];
        } else if (method == "year") {
            return date.getFullYear();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style></style>

        <div id="heading">
            <h1>Event</h1>
            <h2>Studier med grupp</h2>
        </div>
        <div id="info">
            <p>${this.dateLogic("day")} ${this.dateLogic("date")} ${this.dateLogic("month")} ${this.dateLogic("year")}</p>
            <p>${this.eventData[location]}</p>
        </div>
        

        
        `
    }


}


customElements.define("event-info", EventInfo);