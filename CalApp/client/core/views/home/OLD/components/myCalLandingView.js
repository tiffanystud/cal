import { WeekDays } from "./weekDays.js";

export class MyCalLandingView extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.render();
    }


    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host{
                    margin: 10px;
                    display: block;
                }
            </style>
            <week-chart></week-chart>
            <h5>Upcoming Events</h5>
            <event-cards></event-cards>
        `;
    }
}

customElements.define("my-calendar", MyCalLandingView);