import { Store } from "../../../../store/Store.js";
import { PubSub } from "../../../../store/Pubsub.js";
import { EVENTS } from "../../../../store/Events.js";

export class CalDetailBtnComp extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
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


}


customElements.define("cal-detail-btn-comp", CalDetailBtnComp);