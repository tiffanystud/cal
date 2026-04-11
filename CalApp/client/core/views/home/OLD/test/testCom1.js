

/* 

*/
import { PubSub } from "../../../store/pubsub.js";
import { EVENTS } from "../../../store/events.js";

export class TestComp1 extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.subs();
        this.render();
        this.eListeners();
    }

    disconnectedCallback() {

        // Run unsub fns when popup is disconnected 
        // i.e (when view changes and #content.innerHTML changes)
        if (this.unsubscribeOpen) this.unsubscribeOpen();
        if (this.unsubscribeDataUpd) this.unsubscribeDataUpd();

    }

    subs() {

        // Save all unsub fns (used in disconnectedCallback)

        this.unsubscribeOpen = PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.TEST1,
            () => {
                this.openPopup();
            }
        );

        this.unsubscribeDataUpd = PubSub.subscribe(EVENTS.DATA.UPDATED.TEST,
            () => {
                // Rerender if new data
                if (this.isOpen) this.render();
            }
        );

    }

    getValue() {
        // Metod om komponent ska returnera något
        // Ex. en lista events, användare, T/F etc
        return this.data;
    }

    setValue(data) {
        // Metod om komponent ska ta emot värde
        this.data = data || null;
    }

    openPopup(data) {

        if (this.isOpen) return;

        this.isOpen = true;
        this.setValue(data);

        this.shadowRoot.querySelector(".popup").style.display = "block";

    }

    closePopup() {

        this.isOpen = false;

        PubSub.publish(EVENTS.VIEW.POPUP.CLOSED.TEST1,
            this.data || null
        );

        this.shadowRoot.querySelector(".popup").style.display = "none";
    }

    // UI and Events
    render() {
        this.shadowRoot.innerHTML = ``;
    }

    eListeners() {

        this.shadowRoot.addEventListener("click", (e) => {

            if (e.target.id === "test-comp-1-close-btn") {
                const returnValue = this.getValue();
                this.closePopup(returnValue);
            }
            
            if (e.target.id === "test-comp-1-outer-overlay") {
                const returnValue = this.getValue();
                this.closePopup(returnValue);
            }

        });
        
    }
    
}

customElements.define("test-comp-1", TestComp1);