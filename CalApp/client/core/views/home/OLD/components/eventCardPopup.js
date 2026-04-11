import { PubSub } from "../../../store/pubsub.js";

class EventCardPopup extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.event = {};
        PubSub.subscribe("EVENT.RESOURCE", data => {
            this.event = data;
            this.render();
        })
    }

    html() {
        // Få upp alla deltagare för just det eventet kanske? Eller ska vi ha det, kolla hur mycket det är
        return `
            <div id="eventPopupBackground">
                <div id="eventPopupContent">
                    <h1>Event</h1>
                    <h3>${this.event.name}</h3>
                    <p class="datumPlats">${this.event.date}</p>
                    <p class="datumPlats">${this.event.location}</p>
                    <div>   
                    </div>
                </div>  
            </div>
        `
    }

    style() {
        return `    
            <style>
                #eventPopupBackground {
                    display: flex;
                    background-color: rgba(0, 0, 0, 0.45);
                    position: fixed;
                    z-index: 9999;
                    inset: 0;
                    justify-content: center;
                    align-items: center;
                }
                #eventPopupContent {
                    width: 300px;
                    height: 400px;  
                    background-color: white;
                    border-radius: 10px;
                    padding: 25px;
                    display: flex;
                    gap: 25px;
                    flex-direction: column;
                }
                p {
                    border-bottom: 2px solid black;
                }
            </style>

        `

    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            ${this.html()}

        `
    }



}

customElements.define("event-card-popup", EventCardPopup);