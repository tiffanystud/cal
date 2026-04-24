import { PubSub } from "../../core/store/Pubsub.js";
import { EVENTS } from "../../core/store/Events.js";

export class SearchModalElem extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.data = null;
        this.searchableData = null;
        this.value = [];
        this.entity = null;
        this.mode = "single";
        this.context = null;
    }

    connectedCallback() {
        this.entity = this.getAttribute("entity");
        this.mode = this.getAttribute("mode") || "single";
        this.context = this.getAttribute("context");
        this.render();
        this.setupSearch();
        this.subs();
    }

    disconnectedCallback() {
        if (this.unsubCalendars) this.unsubCalendars();
        if (this.unsubUsers) this.unsubUsers();
        if (this.unsubEvents) this.unsubEvents();
        if (this.unsubUgs) this.unsubUgs();
        if (this.unsubFriendships) this.unsubFriendships();
    }

    // INITIALIZING
    subs() {

        this.unsubCalendars = PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET, (data) => {
            if (!this.data) this.data = {};
            this.data.calendars = data;
            this.service();
        });

        this.unsubUsers = PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.USERS.GET, (data) => {
            if (!this.data) this.data = {};
            this.data.users = data;
            this.service();
        });

        this.unsubEvents = PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.EVENTS.GET, (data) => {
            if (!this.data) this.data = {};
            this.data.events = data;
            this.service();
        });

        this.unsubUgs = PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.USERSCALENDARS.GET, (data) => {
            if (!this.data) this.data = {};
            this.data.ugs = data;
            this.service();
        });

        this.unsubFriendships = PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.FRIENDSHIPS.GET, (data) => {
            if (!this.data) this.data = {};
            this.data.friendships = data;
            this.service();
        });

    }

    getValue() {
        return this.value;
    }

    addValue(item) {

        if (this.mode === "single") this.value = [item];
        if (this.mode === "multi") {

            let alreadyAdded = false;
            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i] === item) {
                    alreadyAdded = true;
                }
            }
            if (!alreadyAdded) {
                this.value.push(item);
            }
        }

        this.renderSelected();
        this.publish();

    }

    removeValue(item) {

        let newValue = [];
        for (let i = 0; i < this.value.length; i++) {
            if (this.value[i] !== item) {
                newValue.push(this.value[i]);
            }
        }
        this.value = newValue;

        this.renderSelected();
        this.publish();

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

    publish() {
        // Pub to read comp value, also readable w/.getValue()
        PubSub.publish(EVENTS.DATA.RETURNED.SEARCHMODAL, {
            entity: this.entity,
            context: this.context,
            value: this.getValue()
        });
    }


    // SEARCH-LOGIC
    setupSearch() {

        this.searchInput = this.shadowRoot.querySelector(".search-input");
        this.dropdownInner = this.shadowRoot.querySelector(".dropdown-inner");
        this.dropdown = this.shadowRoot.querySelector(".dropdown");
        this.selectedContainer = this.shadowRoot.querySelector(".selected-container");

        this.searchInput.addEventListener("input", () => {

            const query = this.searchInput.value.trim();
            if (!query) {
                this.closeDropdown();
                return;
            }
            this.search(query);

        });

        document.addEventListener("click", (e) => {
            if (!this.contains(e.target)) {
                this.closeDropdown(); // *** Se över
            }
        });

    }

    search(query) {

        if (!this.searchableData) return;

        let results = [];
        for (let i = 0; i < this.searchableData.length; i++) {
            const item = this.searchableData[i];
            if (item.name.toLowerCase().includes(query.toLowerCase())) {
                results.push(item);
            }
        }

        this.renderDropdown(results);

    }


    // RENDERING
    renderDropdown(resultList) {

        this.dropdownInner.innerHTML = "";

        if (!resultList.length) {
            this.closeDropdown();
            return;
        }

        // Display search hits, add eListeners to elements
        for (let i = 0; i < resultList.length; i++) {

            const item = resultList[i];
            const row = document.createElement("div");
            row.classList.add("result-row");
            row.textContent = item.name || item;

            // Toggle value if clicked
            row.addEventListener("click", () => {
                this.addValue(item);
                if (this.mode === "single") this.searchInput.value = item.name || item;
                if (this.mode === "multi") this.searchInput.value = "";
                this.closeDropdown();
            });

            this.dropdownInner.appendChild(row);
        }

        this.dropdown.classList.remove("hidden");
    }

    closeDropdown() {
        this.dropdown.classList.add("hidden");
        this.dropdownInner.innerHTML = "";
    }

    renderSelected() {

        this.selectedContainer.innerHTML = "";

        if (this.value.length === 0 || this.mode === "single") {
            this.selectedContainer.classList.add("empty");
            return;
        }
        this.selectedContainer.classList.remove("empty");

        // Create box for every selected item 
        for (let i = 0; i < this.value.length; i++) {

            const item = this.value[i];

            const tag = document.createElement("div");
            tag.classList.add("selected-tag");

            const name = document.createElement("span");
            name.textContent = item.name || item;

            const removeBtn = document.createElement("button");
            removeBtn.classList.add("tag-remove");
            removeBtn.textContent = "✕";

            removeBtn.addEventListener("click", () => {
                this.removeValue(item);
            });

            tag.appendChild(name);
            tag.appendChild(removeBtn);
            this.selectedContainer.appendChild(tag);

        }
    }

    style() {
        return `
            :host {
                display: block;
                position: relative;
                width: 100%;
            }

            .search-wrap {
                position: relative;
                width: 100%;
            }

            .search-input {
                width: 100%;
                box-sizing: border-box;
                padding: 9px 12px;
                border: 1px solid #ccc;
                border-radius: 6px;
                font-size: 14px;
                outline: none;
            }

            .search-input:focus {
                border-color: #888;
            }

            .dropdown {
                position: absolute;
                top: calc(100% + 4px);
                left: 0;
                right: 0;
                background: #fff;
                border: 1px solid #ddd;
                border-radius: 6px;
                overflow: hidden;
                z-index: 10;
            }

            .dropdown.hidden {
                display: none;
            }

            .dropdown-inner {
                max-height: 205px;
                overflow-y: auto;
            }

            .result-row {
                padding: 10px 12px;
                font-size: 14px;
                cursor: pointer;
                border-bottom: 1px solid #f0f0f0;
            }

            .result-row:last-child {
                border-bottom: none;
            }

            .result-row:hover {
                background: #f5f5f5;
            }

            .selected-container {
                margin-top: 8px;
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
            }

            .selected-container.empty {
                display: none;
            }

            .selected-tag {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                padding: 4px 8px 4px 10px;
                background: #f2f2f2;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 13px;
            }

            .tag-remove {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0;
                font-size: 12px;
                color: #888;
            }

            .tag-remove:hover {
                color: #222;
            }
        `;
    }

    render() {

        this.shadowRoot.innerHTML = `
        
            <style>${this.style()}</style>

            <div class="search-wrap">
                <input
                    class="search-input"
                    type="text"
                    placeholder="Search..."
                    autocomplete="off"
                />
                <div class="dropdown hidden">
                    <div class="dropdown-inner"></div>
                </div>
            </div>

            <div class="selected-container empty" part="selected-container"></div>
        `;
    }

}

customElements.define("search-modal-elem", SearchModalElem);