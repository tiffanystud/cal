import { WeekDays } from "./weekDays.js";
import { EventCardContainer } from "./eventCardContainer.js";

export class CalRender extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.render();

        
    }


    render() {
        //Vill veta: Vad filterfunc vet.
        this.shadowRoot.innerHTML = `
            <style>
                :host{
                    margin: 10px;
                    display: block;
                }
            </style>
            <event-cards></event-cards>
        `;
    }
}

customElements.define("cal-render", CalRender);