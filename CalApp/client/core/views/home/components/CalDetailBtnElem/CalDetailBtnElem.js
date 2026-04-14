import { Store } from "../../../../store/Store.js";
import { PubSub } from "../../../../store/Pubsub.js";
import { EVENTS } from "../../../../store/Events.js";

export class CalDetailBtnElem extends HTMLElement {

    constructor() {
        
        super();
        this.attachShadow({ mode: "open" });
        
        this.loading = false;
        this.isOpen = false;
        this.data = null;
        
    }

    subs() {

        this.unsubChangeDetailBtn = PubSub.subscribe(EVENTS.DATA.SELECTED.CALENDARS, (calId) => {
            this.detail = this.getCalName(calId);
            this.render();
        })
    }

    unsubs() {
        if (this.unsubChangeDetailBtn) unsubChangeDetailBtn();
    }

    connectedCallback() {
        this.detail = this.getCalName(calId);
        this.render();
    }

    
    getCalendarName(id) {
        if(!id) {
            return "all";
            
            const calendars =  ""
        }
    }

}


customElements.define("cal-detail-btn-elem", CalDetailBtnElem);