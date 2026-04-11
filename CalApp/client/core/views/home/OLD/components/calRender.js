import { store } from "../../../store/store.js";
import { PubSub } from "../../../store/pubsub.js";
import { EVENTS } from "../../../store/events.js";

export class CalRender extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.content = document.getElementById("content");
        PubSub.subscribe("change:detail-btn", (calId) => {
            if (calId == "All"){
                PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, {
                    page: "home"
                }); 
                return;
            }
            if(document.querySelector("filter-cals")){
                let filterCals = document.querySelector("filter-cals")
                this.content.removeChild(filterCals);
            }
            let cal = store.getState().cals.find(c => c.id === calId);
            PubSub.publish("SELECTEDCALS.EVENTS.STATE.POST", cal);
        })
    }

}

customElements.define("cal-render", CalRender);

new CalRender();