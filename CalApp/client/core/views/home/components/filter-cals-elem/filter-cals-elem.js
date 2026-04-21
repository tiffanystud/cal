import { PubSub } from "../../../../store/Pubsub.js";
import { EVENTS } from "../../../../store/Events.js";
import { StoreService } from "../../../../services/StoreService.js";

class FilterCalendarsElem extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.subs();
        this.service();
        this.render();
        this.eListeners();
    }

    subs() {
        // Updated cals in state
        StoreService.getNotifiedStoreChanges("cals", (updatedCals) => {
            // Re-render
            this.data = updatedCals;
            this.render();
            this.eListeners();
        });
    }

    service() {
        // Users cals
        this.data = PubSub.publish(EVENTS.DATA.SELECTED.CALENDARS);
    }
    
    createBoxes() {

        let calBoxHTML = "";

        for (let currCal of this.data) {
            calBoxHTML += `
                <div class="calBoxes" id="${currCal.id}">
                ${currCal.name}
                </div>
            `;
        }
        return calBoxHTML;
    }

    style() {
        return `
            <style>
                #filter-container {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    flex-wrap: wrap;
                }
                #cals {
                    display: flex;
                    gap: 5px;
                    flex-wrap: wrap;
                    flex: 1;
                }
                .calBoxes {
                    display: flex;
                    gap: 5px;
                    background-color: white;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    border-radius: 10px;
                    cursor: pointer;
                }
                #createGroupBtn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 10px;
                    border-radius: 10px;
                    background-color: white;
                    border: none;
                    cursor: pointer;
                    font-weight: bold;
                    white-space: nowrap;
                }
                #createGroupBtn:hover {
                    background-color: #e0e0e0;
                }
                    
                .selectedBox {
                    background-color: blue;
                }   
            </style>
        `;
    }
    
    render() {
        this.shadowRoot.innerHTML = `
        
            ${this.style()}
            
            <div id="filter-container">
                <div id="cals"> ${this.createBoxes()}</div>
                <button id="createGroupBtn">+ Create Group</button>
            </div>
        `;
    }

    eListeners() {

        const allCalendarBoxes = this.shadowRoot.querySelectorAll(".calBoxes");

        for (let currCalBox of allCalendarBoxes) {

            // subscribe through store
            currCalBox.addEventListener("click", () => {

                //Change to "EVENTS.VIEW.POPUP.SHOW.EVENT"
                const selectedCal = this.data.find(cal => currCalBox.id == cal.id);
                PubSub.publish(EVENTS.VIEW.POPUP.SHOW.TEST1, (selectedCal));

            })
        }
    }

}

customElements.define("filter-calendars-elem", FilterCalendarsElem);