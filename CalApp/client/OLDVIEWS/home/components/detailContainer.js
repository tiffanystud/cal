import { PubSub } from "../../../store/pubsub.js";
import { CalInfoBtn } from "./calInfoBtn.js";

export class DetailContainer extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.cal = false;
    }
    connectedCallback() {
        this._sub = PubSub.subscribe("change:detail-btn", (calId) => {
            this.cal = calId === "All" ? false : calId;
            this.render();
        });
    
        this.render();
    }

    render() {
    this.shadowRoot.innerHTML = `
        <style>
            :host {

                display: flex;
                justify-content: space-around; 
            }
        </style>
        <cal-detail-btn></cal-detail-btn>
        ${this.cal ? `<cal-info-btn id="${this.cal}"></cal-info-btn>` : ""}
    `;
    }
}
customElements.define("detail-container", DetailContainer);