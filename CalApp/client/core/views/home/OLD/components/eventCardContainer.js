import { PubSub } from "../../../store/pubsub.js";
import { store } from "../../../store/store.js";

export class EventCardContainer extends HTMLElement{
    constructor(){
        super();
        this.context = "All"
        this.attachShadow({mode: "open"});
        PubSub.subscribe("change:detailbtn", (detail) => {
            this.context = detail;
            this.render();
        })
        this.render();
    }

    renderCards(eventlist){
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let sorted = eventlist.sort((a,b) => new Date(a.date) - new Date(b.date));
        let grouped = sorted.reduce((result, e) => {
            let date = new Date(e.date);
            let month = months[date.getMonth()];
            if (!result[month]) result[month] = [];
            result[month].push(e);
            return result;
        }, {});
        let html = "";
        
        for (const [month, list] of Object.entries(grouped)) {
            html += `
                <style>
                    :host {
                        font-family: Helvetica;
                    }
                    .card {
                        background-color: rgba(0, 0, 0, 0.184);
                        display: flex;
                        flex-direction: column;

                    }
                    .card-color {
                        background-color: rgb(255, 243, 155);
                        height: 24px;
                    }
                    .content {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px;
                        gap: 8px;
                    }
                    .date {
                        display: flex;
                        flex-direction: column;
                        width: 40px;
                        height: 40px;
                        align-items: center;
                        justify-content: center;
                    }
                    .description h4 {
                        margin: 2px;
                        font-weight: 600;
                    }
                    .description p {
                        margin: 4px;
                        font-weight: 300;
                    }
                    .date p {
                        margin: 0;

                    }
                    .description{
                        flex-grow: 3;
                    }
                    .host {
                        align-self: flex-end;
                    }
                </style>
                <div class="group">
                    <h4 class="month">${month}</h4>
                    ${list.map(e => `
                        <div class="card">
                            <div class="card-color"></div>
                            <div class="content">
                                <div class="date">
                                    <p>${new Date(e.date).toLocaleDateString("en", { weekday: "short" }).toUpperCase()}</p>
                                    <p>${new Date(e.date).getDate()}</p>
                                </div>
                                <div class="description">
                                    <h4>${e.name}</h4>
                                    <p>${e.location}</p>
                                </div>
                                <div class="host">
                                    ${store.getState().cals.find(x => x.id === e.calId)?.name ?? ""}
                                </div>
                            </div>
                        </div>
                        `)
                        .join("")}
                </div>
            `;
        }
        return html;
    }

    render(){
        let eventsInContext = store.getState().events
        if (this.context !== "All"){
            eventsInContext = eventsInContext.filter(x => x.calId == this.context);
        }

        this.shadowRoot.innerHTML = `
            <div id="events">
                ${this.renderCards(eventsInContext)}
            </div>
        `;
    }
    
}
customElements.define("event-card-container", EventCardContainer);