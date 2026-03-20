import { store } from "../../../store/store.js";

class FilterCals extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.filterdCals = [];

        store.subscribe(filterdCals, data => {

        })
    }

    html() {
        for (let cal of this.filterdCals) {
            return `
                <div class="calBoxes" id="${cal.id}">
                    <p>${cal.name}</p>   
                </div>
            `
        }
    }

    style() {
        return `
            <style>
                .calBoxes {
                    display: flex;
                    gap: 5px;
                }
            </style>
        `
    }

    eventListeners() {
        let allCals = this.shadowRoot.querySelectorAll("calBoxes");
        for (let pressedCals of allCals) {
            // subscribe through store
            pressedCals.style.backgroundColor = "blue";
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            ${this.html()}
        
        `
    }


}

customElements.define("filter-cals", FilterCals);