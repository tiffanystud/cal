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

export class SearchModalElem extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.data = null;
        this.value = [];
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


        // --- GET DATA ---
        // CALENDARS
        PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET, (data) => {
            if (this.data.calendars) Object.assign(this.data.calendars, data);
            if (!this.data.calendars) this.data.calendars = data;
            this.service();
        })

        // USERSCALENSARS
        PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.USERSCALENDARS.GET, (data) => {
            if (this.data.ugs) Object.assign(this.data.ugs, data);
            if (!this.data.ugs) this.data.ugs = data;
            this.service();
        })

        // EVENTS
        PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.EVENTS.GET, (data) => {
            if (this.data.ugs) Object.assign(this.data.ugs, data);
            if (!this.data.ugs) this.data.ugs = data;
            this.service();
        })

        // USERS
        PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.USERS.GET, (data) => {
            if (this.data.users) Object.assign(this.data.users, data);
            if (!this.data.users) this.data.users = data;
            this.service();;
        })

        // FRIENDSHIPS
        PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.FRIENDSHIPS.GET, (data) => {
            if (this.data.friendships) Object.assign(this.data.friendships, data);
            if (!this.data.friendships) this.data.friendships = data;
            this.service();
        })

    }

    openPopup() {
        this.backdrop.classList.remove("hidden");
        this.searchInput.value = "";
        this.resultsContainer.innerHTML = "";
        this.searchInput.focus();
    }

    closePopup() {
        // RETURN DATA 
        // (view/opening comp needs to listen to this, sort by context)
        PubSub.publish(EVENTS.DATA.RETURNED.SEARCHMODAL, {
            entity: this.entity,
            context: this.context,
            value: this.getValue()
        });
        this.backdrop.classList.add("hidden");
    }

    getValue() {
        return this.value;
    }

    setValue(newVal) {
        // Toggle value (if in list = remove, !in list = add )
        for (let currV of this.value) {
            if (currV == newVal) this.value = this.value.filter(currItem => currItem == newVal);
        }
    }

    // COMPONENT-SPECIFIC
    setupSearch() {
        this.searchInput = this.shadowRoot.querySelector(".search-input");
        this.resultsContainer = this.shadowRoot.querySelector(".results-container");
        this.searchInput.addEventListener("input", () => {
            const userQuery = this.searchInput.value.trim();
            // getSearchData(this.entity)
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

    getSearchData(entitiy) {

        let data;

        switch (entitiy) {
            case "calendars":
                console.log("calendars");
                const resource = PubSub.publish(EVENTS.DATA)
                break;

            case "":
                console.log("HEJ");
                break;

            default:
                console.log("HEJDÅ");
                break;
        }
    }

    service() {

        // Check if component has all data needed for result rendering
        switch (this.entity) {
            case "calendars":
                // (viewservice needs to sort by what context)
                if (!this.data.calendars) return console.log("GET SOME DATA");
                renderResults(this.data.calendars);
                break;

            case "events":
                // DO I HAVE ENOUGH INFO FOR RENDERING?
                // DUMMYID
                // UGS
                // EVENTS
                break;

            case "ugs":
                // DO I HAVE ENOUGH INFO FOR RENDERING?
                // UGS
                // CALENDARS
                break;

            default:
                console.log("No matching entity")
        }
    }
    // RENDERING
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

    renderSearchElem() {
        // Search inputfield/element   
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

    renderResults(resultList) {

        this.resultsContainer.innerHTML = "";

        resultList.forEach(item => {

            const row = document.createElement("div");

            row.classList.add("result-row");
            row.textContent = item.name || item;

            row.addEventListener("click", () => {
                this.setValue(item);
                this.closePopup();
            });

            this.resultsContainer.appendChild(row);

        });
    }
    
    renderSelectedBox() {
        // Basic, open for styling for each view
    }

}

customElements.define("search-modal-elem", SearchModalElem);