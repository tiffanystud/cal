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
            <filter-cals></filter-cals>
            <week-chart></week-chart>
            <event-card-container></event-card-container>
        `;
    }
}

customElements.define("cal-render", CalRender);