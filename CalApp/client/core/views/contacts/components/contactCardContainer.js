import { store } from "../../../store/store.js";
import { apiRequest } from "../../../services/api.js";

export class ContactCardContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
        this.unsubscribe = store.subscribe(() => {
            this.update();
        });
    }

    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }

    async update(){
        const state = store.getState();

        const currentUserId = state.isLoggedIn.id;
        const connections = state.data.friends;

        this.contacts = await this.getContacts(currentUserId);
        this.render();
    }

    async getContacts(userId){
        try {
            let friends = await apiRequest({
            entity: `friendships?userId=${userId}`,
            method: "GET"
        })
        console.log(friends);
        return friends;

        } catch (err){
            return [{name: "Emma"}, {name: "Julia"}, {name: "Besa"},{name: "Kastriot"}];
        }

    }

    async render() {
        const state = store.getState();
        const userID = state.isLoggedIn.id;
        const contacts = await this.getContacts(userID);

        contacts.sort((x, y)=> x.name < y.name);


        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
            </style>
            <div class="container">
                ${contacts.map(c => `
                    <div class="card">
                        ${c.name || "No name"}
                    </div>
                `).join("")}
            </div>
        `;
    }

}

customElements.define("contact-card-container", ContactCardContainer);