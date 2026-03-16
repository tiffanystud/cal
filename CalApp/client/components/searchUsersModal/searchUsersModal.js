import { PubSub } from "../../core/store/pubsub.js";
import { apiRequest } from "../../core/services/api.js"; 

export class SearchUsersModal extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/searchUsersModal/searchUsersModal.css">

            <div class="modal-backdrop hidden">
                <div class="modal">

                    <div class="modal-header">
                        <h3>Search users</h3>
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
            this.currContext = componentData.context; // What component opens modal
            this.openModal();
        });

        // Close modal
        this.closeBtn.addEventListener("click", () => this.closeModal());
        this.backdrop.addEventListener("click", e => {
            if (e.target === this.backdrop) this.closeModal();
        });

        // Search input listener
        this.searchInput.addEventListener("input", () => {
            const query = this.searchInput.value.trim();
            this.searchUsers(query);
        });
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
            console.error("API error: ", err);
            this.resultsContainer.innerHTML = "<div>Error loading users</div>";
            return;
        }

        // Filter users by name (frontend search)
        const filtered = allUsers.filter(u =>
            u.name.toLowerCase().includes(query.toLowerCase())
        );

        this.renderResults(filtered);
    }

    renderResults(users) {

        this.resultsContainer.innerHTML = "";

        users.forEach(currUser => {

            const row = document.createElement("div");
            row.classList.add("result-row");
            row.textContent = currUser.name;

            // Klick på user > publicera event 
            row.addEventListener("click", () => {
                PubSub.publish("Users::UserSelected", {
                    user: currUser,
                    context: this.currContext // From comp. using search module
                });
                this.closeModal();
            });

            this.resultsContainer.appendChild(row);
        });
    }
}

customElements.define("search-users-modal", SearchUsersModal);