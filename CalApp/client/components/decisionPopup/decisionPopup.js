/* 
<desicion-popup 
    popupHeader="Ta bort kalender?"
    popuptext="Detta går inte att ångra."
    popupBtnCancel="Nej, avbryt"
    popupBtnDelete="Ja, ta bort">
</desicion-popup>
*/

import { EVENTS } from "../../core/store/events.js";
import { PubSub } from "../../core/store/pubsub.js"

export class desicionPopup extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.45);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 99999;
                }

                /* Hidden state */
                .hidden {
                    display: none;
                }

                .container {
                    background-color: white;
                    padding: 20px 40px;
                    display: flex;
                    flex-direction: column;
                    border-radius: 10px;
                    margin: 0 20px;
                }

                .closeContainer {
                    display: flex;
                    justify-content: right;
                }

                .popupBtnClose {
                    width: 20px;
                    background-color: transparent;
                    border: 0;
                    font-size: 20px;
                }

                .popupContainer {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 30px;
                }

                .popupHeading {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }

                .popupCirkle {
                    padding: 15px;
                    border: 3px solid red;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    font-size: 40px;
                    justify-content: center;
                    align-items: center;
                    font-family: Verdana;
                    color: red;
                    display: flex;
                }

                .popupBtnContainer {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                .popupHeader {
                    font-family: Verdana;
                    font-size: 18px;
                    font-weight: 600;
                    color: rgb(85, 85, 85);
                    margin: 0;
                }

                .popuptext {
                    font-size: 15px;
                    text-align: center;
                    margin-top: 0;
                    font-family: Verdana;
                }

                .popupBtnAll {
                    padding: 20px 40px;
                    background-color: rgb(150, 181, 238);
                    border-radius: 50px;
                    border: 0;
                    font-size: 15px;
                }

                .popupBtnCancel:hover {
                    background-color: rgb(104, 143, 216);
                }

                .popupBtnDelete {
                    background-color: transparent;
                    color: red;
                }
            </style>
            
            <div class="modal-backdrop hidden">
                <div class="container">

                    <div class="closeContainer">
                        <button class="popupBtnClose">x</button>
                    </div>

                    <div class="popupContainer">
                        <div class="popupHeading">
                            <div class="popupCirkle">x</div>
                            <h3 class="popupHeader">Are you sure?</h3>
                        </div>

                        <p class="popuptext">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>

                        <div class="popupBtnContainer">
                            <button class="popupBtnCancel popupBtnAll">No, cancel</button>
                            <button class="popupBtnDelete popupBtnAll">Yes, delete</button>
                        </div>
                    </div>

                </div>
            </div>
        `;
        
        this.subs();
        
    }

    subs() {
        
        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.DESICIONPOPUP, (componentData) => {
            this.currContext = componentData.context; // Vilken komponent öppnar popupen
            this.openModal();
        })
        
    }
    
    connectedCallback() {

        // Elements
        this.backdrop = this.shadowRoot.querySelector(".modal-backdrop");
        this.closeBtn = this.shadowRoot.querySelector(".popupBtnClose");
        this.cancelBtn = this.shadowRoot.querySelector(".popupBtnCancel");
        this.deleteBtn = this.shadowRoot.querySelector(".popupBtnDelete");
        this.headerElem = this.shadowRoot.querySelector(".popupHeader");
        this.textElem = this.shadowRoot.querySelector(".popuptext");

        // Set text or use default
        this.headerElem.innerText = this.getAttribute("popupHeader") || "Are you sure?";
        this.textElem.innerText = this.getAttribute("popuptext") || "This process cannot be undone.";
        this.cancelBtn.innerText = this.getAttribute("popupBtnCancel") || "No, cancel";
        this.deleteBtn.innerText = this.getAttribute("popupBtnDelete") || "Yes, proceed";


        // Close
        this.closeBtn.addEventListener("click", () => this.closeModal());

        this.backdrop.addEventListener("click", e => {
            if (e.target === this.backdrop) this.closeModal();
        });

        // Cancel BTN
        this.cancelBtn.addEventListener("click", () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME);
            this.closeModal();
        });

        // Confirm BTN
        this.deleteBtn.addEventListener("click", () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME);
            PubSub.publish(EVENTS.STORE.UPDATED.CALENDARS);
            // Ska context skickas vidare?
            this.closeModal();
        });
    }

    // Open
    openModal() {
        this.backdrop.classList.remove("hidden");
    }

    // Close
    closeModal() {
        this.backdrop.classList.add("hidden");
    }
}
