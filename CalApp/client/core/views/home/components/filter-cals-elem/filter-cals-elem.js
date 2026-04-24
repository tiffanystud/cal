import { PubSub } from "../../../../store/Pubsub.js";
import { EVENTS } from "../../../../store/Events.js";
import { StoreService } from "../../../../services/StoreService.js";
import { HomeViewService } from "../../HomeViewService.js";

class FilterCalsElem extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.data = null;
    }

    connectedCallback() {
        this.service();
        this.subs();
        this.render();
        this.eListeners();
    }

    subs() {

        PubSub.subscribe(EVENTS.DATA.SELECTED.CALENDARS, (cals) => {
            this.data = cals;
            this.render();
            this.eListeners();
        });



        // Get cals, and updated cals in state
        /*         StoreService.getNotifiedStoreChanges("cals", (updatedCals) => {
                    // Re-render
                    this.data = updatedCals;
                    this.render();
                    this.eListeners();
                }); */

    }

    service() {
        // Trigger HomeViewService
        PubSub.publish(EVENTS.REQUEST.SENT.CALENDARS.GET);
        PubSub.publish(EVENTS.REQUEST.SENT.USERSCALENDARS.GET);
    }

    createBoxes() {

        if (!this.data) return console.log("I DONT HAVE THE DATA YET");
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
            #filter-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 12px;
                flex-wrap: wrap;
            }
            #cals {
            padding-top: 4px;
                display: flex;
                justify-content: center;
                gap: 5px;
                flex-wrap: wrap;
                flex: 1;
                max-height: 90px;
                overflow: scroll;
                border-bottom: 2px solid #449bd2; 
                border-top: 2px solid #449bd2; 
                background-color:rgb(211, 221, 227)
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
                color:  #235574;
            }
            .create-cal-button-container {
                width: 100%;
                display: flex;
                justify-content: right;
            }
            #createGroupBtn {
                padding: 5px 8px;
                border-radius: 10px;
                border: 1px solid #235574;
                background-color: transparent;
                color: #235574;
            }
            
            .calBoxes: hover {
                background-color:  #e0e0e0;
            }
                
            #createGroupBtn:hover {
                background-color: #8dbbdc;
            }
                
            .selectedBox {
                background-color:  #3583b3;
                color: white; 
            }   
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
        
            <style>${this.style()}</style>
            
            <div id="filter-container">
                <div id="cals"> ${this.createBoxes()}</div>
                <div class="create-cal-button-container">
                    <button id="createGroupBtn">New Calendar</button>
                </div>
            </div>
        `;
    }

    eListeners() {

        const allCalendarBoxes = this.shadowRoot.querySelectorAll(".calBoxes");

        for (let currCalBox of allCalendarBoxes) {

            // subscribe through store
            currCalBox.addEventListener("click", () => {

                // !selectedBox == add selectedBox and vice versa
                currCalBox.classList.toggle("selectedBox");

                //Change to "EVENTS.VIEW.POPUP.SHOW.EVENT"
                const selectedCal = this.data.find(cal => currCalBox.id == cal.id);
                PubSub.publish(EVENTS.VIEW.POPUP.SHOW.TEST1, (selectedCal));

            })
        }
    }

}

customElements.define("filter-cals-elem", FilterCalsElem);