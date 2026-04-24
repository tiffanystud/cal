/* 
subscribe(EVENTS.VIEW.POPUP.SHOW.SEARCHMODAL, (
    payload.entity; "events"
    payload.mode || null; "tags"
    payload.context; "who opened the searchModal?"
)
publish(PubSub.publish(EVENTS.DATA.RETURNED.SEARCHMODAL, {
    entity: this.entity,
    context: this.context,
    value: this.getValue()
});)
*/

import { PubSub } from "../../core/store/Pubsub.js";
import { EVENTS } from "../../core/store/Events.js";
import { StoreService } from "../../core/services/StoreService.js";

export class SearchModalPopup extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.data = null;
    }

    connectedCallback() {
        this.render();
        this.subs();
    }

    disconnectedCallback() {
        if (this.unsubscribeOpen) this.unsubscribeOpen();
    }

    subs() {
        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.SEARCHMODAL, (payload) => {
            this.entity = payload.entity; // users, calendars, events
            this.mode = payload.mode || null;  // ex. "tags", "username", "ID"
            this.context = payload.context // Who opened the comp? ex. "filter-cals-elem"

            this.headerText = `Search ${this.entity}`;

            this.openPopup();
            this.setupSearch();
        });
    }

    openPopup() {
        this.backdrop.classList.remove("hidden");
        this.searchInput.value = "";
        this.resultsContainer.innerHTML = "";
        this.searchInput.focus();
    }

    closePopup() {
        this.backdrop.classList.add("hidden");
    }

    getValue() {
        return this.value;
    }

    setValue(newVal) {
        this.value = newVal;
    }

    setupSearch() {
        this.searchInput = this.shadowRoot.querySelector(".search-input");
        this.resultsContainer = this.shadowRoot.querySelector(".results-container");
        this.searchInput.addEventListener("input", () => {
            const userQuery = this.searchInput.value.trim();
            this.search(userQuery);
        });
    }

    async search(query) {

        if (!query) {
            this.resultsContainer.innerHTML = "";
            return;
        }

        switch (this.entity) {
            case "users":
                return this.searchUsers(query);

            case "calendars":
                return this.searchCalendars(query);

            case "events":
                return this.searchEvents(query);

            default:
                console.error("Unknown entity:", this.entity);
        }
    }

    renderResults(resultList) {

        this.resultsContainer.innerHTML = "";

        resultList.forEach(item => {

            const row = document.createElement("div");

            row.classList.add("result-row");
            row.textContent = item.name || item;

            row.addEventListener("click", () => {

                this.setValue(item);

                // View/opening comp needs to listen to this, sort by context
                PubSub.publish(EVENTS.DATA.RETURNED.SEARCHMODAL, {
                    entity: this.entity,
                    context: this.context,
                    value: this.getValue()
                });

                this.closePopup();
            });

            this.resultsContainer.appendChild(row);

        });
    }

    style() {
        return `
            .modal-backdrop {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.45);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 99999; 
            }

            .hidden {
                display: none;
            }

            .modal {
                background: white;
                width: 320px;
                padding: 16px;
                border-radius: 6px;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                gap: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.25);
            }

            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .close-btn {
                background: transparent;
                border: none;
                font-size: 18px;
                cursor: pointer;
            }

            /* Input */
            .search-input {
                width: 100%;
                padding: 8px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-radius: 4px;
            }

            /* Result-list */
            .results-container {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            /* search row */
            .result-row {
                padding: 8px;
                background: #f2f2f2;
                border-radius: 4px;
                cursor: pointer;
            }

            .result-row:hover {
                background: #e0e0e0;
            }
        `
    }

    render() {
        this.shadowRoot.innerHTML = `
        <style>${this.style()}</style>

        <div class="modal-backdrop hidden">
            <div class="modal">

                <div class="modal-header">
                    <h3>${this.headerText || "Search"}</h3>
                    <button class="close-btn">X</button>
                </div>

                <input class="search-input" type="text" placeholder="Search...">

                <div class="results-container"></div>

            </div>
        </div>
    `;
    }

}

customElements.define("search-modal-popup", SearchModalPopup);