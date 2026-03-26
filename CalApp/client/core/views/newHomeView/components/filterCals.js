import { store } from "../../../store/store.js";
import { PubSub } from "../../../store/pubsub.js";
import { EVENTS } from "../../../store/events.js";

class FilterCals extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.userCals = store.getState().cals;
        console.log(this.userCals);
        this.render();

        // store.subscribe("cals", (data) => {
        //     this.userCals = data;
        //     this.render();
        // })
        this.eventListeners();
    }

    html() {
        let allHtml = "";
        for (let cal of this.userCals) {
            allHtml += `
                <div class="calBoxes" id="${cal.id}">${cal.name}</div>
            `
        }
        return allHtml;
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
            </style>
        `
    }

    eventListeners() {
        let allCals = this.shadowRoot.querySelectorAll(".calBoxes");
        for (let pressedCals of allCals) {
            // subscribe through store
            pressedCals.addEventListener("click", () => {
                if (!pressedCals.classList.contains("selected")) {
                    PubSub.publish("SELECTEDCALS.EVENTS.STATE.POST", this.userCals.find(cal => pressedCals.id == cal.id));
                    pressedCals.style.backgroundColor = "blue";
                    pressedCals.classList.add("selected");
                } else {
                    PubSub.publish("SELECTEDCALS.EVENTS.STATE.DELETE", this.userCals.find(cal => pressedCals.id == cal.id));
                    pressedCals.style.backgroundColor = "white";
                    pressedCals.classList.remove("selected");
                }
            })
        }

        const createGroupBtn = this.shadowRoot.querySelector("#createGroupBtn");
        createGroupBtn.addEventListener("click", () => {
            PubSub.publish(EVENTS.VIEW.POPUP.SHOW.CREATEGROUP);
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            <div id="filter-container">
                <div id="cals">
                    ${this.html()}
                </div>
                <button id="createGroupBtn">+ Create Group</button>
            </div>
        `
    }


}

customElements.define("filter-cals", FilterCals);