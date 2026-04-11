/* Vid en specifik popup (ex. events?id=65afetd522) */
import { PubSub } from "../../../store/pubsub";
import { EVENTS } from "../../../store/events";
import { store } from "../../../store/store.js";


export class TestComp2 extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.loading = false;
        this.data = null;

        this.subs()
    }

    subs() {

        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.TEST1, (urlParams) => {
            if (urlParams){
                this.compService(data.subPath);
            }
            this.openPopup();
            
        })

        PubSub.subscribe(EVENTS.VIEW.POPUP.CLOSE.TEST1, () => {
            this.closePopup();
        })


    }

    connectedCallback() {
        // Komponentens egna "constructor" -> ?
        this.render();

    }

    disconnectedCallback() {
        // Ta bort globala lyssnare (om inaktiv komponent) -?
        if (this.unsubscribe) this.unsubscribe();
        this.closePopup();
    }

    async compService(subPath){
        //kollar subpath, exvis ?id
        // Om id inte finns i events, fetcha, annars 
        if (subPath){
              store.getState().test2
        }

    }


    getValue() {
        // Metod om komponent ska returnera något
        // Ex. en lista events, användare, T/F etc
    }

    setValue() {
        // Metod om komponent ska ta emot värde
    }

    openPopup() {
        this.popupContainer.classList.remove("hidden");
    }

    closePopup() {
        this.popupContainer.classList.add("hidden");
        // koppla disc
    }



}

customElements.define("test-comp-2", TestComp2);