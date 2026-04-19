import { PubSub } from "../../../store/pubsub.js";
import { CalInfoBtn } from "./calInfoBtn.js";


export class CalendarFilterElem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.data;
    }

    connectedCallback(){}
    
    disconnectedCallback(){}
    
    subs() {}
    
    render() {}
    
    service() {}
    
    eListeners() {}
    
}




customElements.define("calendar-filter-elem", CalendarFilterElem);

