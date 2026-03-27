import { PubSub } from "../../core/store/pubsub.js";
import { apiRequest } from "../../core/services/api.js";
import { store } from "../../core/store/store.js";

export class SearchUsersModalTest extends HTMLElement {

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
            </style>

            <div class="modal-backdrop hidden">
                <div class="modal">

                    <div class="modal-header">
                        <h3></h3>
                        <button class="close-btn">X</button>
                    </div>

                    <input class="search-input" type="text" placeholder="Search user...">

                    <div class="results-container"></div>

                </div>
            </div>
        `;
    }

    connectedCallback() {

        this.backdrop = this.shadowRoot.querySelector(".modal-backdrop");
        this.closeBtn = this.shadowRoot.querySelector(".close-btn");
        this.searchInput = this.shadowRoot.querySelector(".search-input");
        this.resultsContainer = this.shadowRoot.querySelector(".results-container");

        // Open modal (global event)
        this.unsubscribeOpen = PubSub.subscribe("Users::OpenSearchModal", componentData => {
            this.shadowRoot.querySelector("h3").innerHTML = `Search users`; // temporär lösning, content typ ska fås av componentdata istället
            this.currContext = componentData.context; // What component opens modal // Var sker publishen av Users::OpenSearchModal?
            this.openModal();
            this.searchInput.addEventListener("input", () => {
                const query = this.searchInput.value.trim();
                this.searchUsers(query);
            });
        });
        this.unsubscribeTags = PubSub.subscribe("Tags::OpenSearchModal", componentData => {
            // What component opens modal
            this.shadowRoot.querySelector("h3").innerHTML = `Search tags`; // temporär lösning, content typ ska fås av componentdata istället
            this.openModal();
            this.searchInput.addEventListener("input", () => {
                const query = this.searchInput.value.trim();
                this.searchTags(query);
            });
        });

        // Close modal
        this.closeBtn.addEventListener("click", () => this.closeModal());
        this.backdrop.addEventListener("click", e => {
            if (e.target === this.backdrop) this.closeModal();
        });

        // Search input listener
        // this.searchInput.addEventListener("input", () => {
        //     const query = this.searchInput.value.trim();
        //     if (this.unsubscribeOpen) {
        //         this.searchUsers(query);
        //     } else if (this.unsubscribeTags) {
        //         this.searchTags(query);
        //     }
        // });

    }

    disconnectedCallback() {
        if (this.unsubscribeOpen) this.unsubscribeOpen();
    }



    openModal() {
        this.backdrop.classList.remove("hidden");
        this.searchInput.value = "";
        this.resultsContainer.innerHTML = "";
        this.searchInput.focus();
    }

    closeModal() {
        this.backdrop.classList.add("hidden");
    }

    // Fetch users from API and filter
    async searchUsers(query) {

        // Om tom söksträng > visa inget
        if (!query) {
            this.resultsContainer.innerHTML = "";
            return;
        }

        let allUsers = [];

        try {
            // GET /users > returnerar alla users
            allUsers = await apiRequest({
                entity: "users",
                method: "GET"
            });

        } catch (err) {
            this.resultsContainer.innerHTML = "<div>Error loading users</div>";
            return;
        }

        // Filter users by name (frontend search)
        const filtered = allUsers.filter(u =>
            u.name.toLowerCase().includes(query.toLowerCase())
        );

        this.renderResults(filtered);
    }

    searchTags(query) {

        this.modalHeaderText = "tags";

        if (!query) {
            this.resultsContainer.innerHTML = "";
            return;
        }

        let state = store.getState();
        const filterdTags = state.selectedEvents.filter(event => event.tags.includes(query));

        // Dessa tre rader sätter in alla tags strängar och gör en ny array utan duplikationer, så det inte dupliceras i render
        let allTagsString = filterdTags.map(event => event.tags);
        let uniqueFilterdsTags = [...new Set(allTagsString)];
        this.renderResults(uniqueFilterdsTags, "tags");


    }

    renderResults(entity, key) {

        this.resultsContainer.innerHTML = "";

        entity.forEach(currObj => {

            const row = document.createElement("div");
            row.classList.add("result-row");

            row.textContent = currObj.name || currObj;

            // Klick på user > publicera event 
            row.addEventListener("click", () => {
                // let newState = store.getState().selectedEvents.filter(event => event.tags == currObj);
                // Setstate för selectedEvents så events får en notify för att filtrera ut rätt events för tag
                PubSub.publish("Users::Selected", {
                    selectedItem: currObj.name || currObj,
                    context: this.currContext // From comp. using search module
                });
                this.closeModal();
            });

            this.resultsContainer.appendChild(row);
        });
    }
}

customElements.define("search-users-modal-test", SearchUsersModalTest);