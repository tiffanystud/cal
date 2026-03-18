import { store } from "../../../store/store.js";
import { apiRequest } from "../../../services/api.js";

export class ContactCardContainer extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.context = this.getAttribute("context");
        this.groupId = this.getAttribute("group-id")
        this.render();
        this.unsubscribe = store.subscribe(() => {
            this.update();
        });
    }

    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }

    async update(){
        this.render();
    }

    async loadFriends(userId){
        try {
            let friends = await apiRequest({
            entity: `friendships?userId=${userId}`,
            method: "GET"
        })
        return friends;

        } catch (err){
            return err;
        }

    }

    async loadCalContacts(calId){
        let connections;
        try {
            connections = await apiRequest({
                entity:`users_calendars?calId=${calId}`,
                method: "GET"
            });
        } catch (err){
            return err;
        }
        let users;
        try {
            users = await apiRequest({
                entity: `users`,
                method: "GET"
            })
        } catch (err){
            return err;
        }
        const members = [];
        for (let x of connections) {
            for (let y of users){
                if (x.userId === y.id){
                    members.push(y);
                }
            }
        }
        return members;

    }

    async render() {
        const state = store.getState();
        const userID = state.isLoggedIn.id;
        let contacts;
        if (this.context === "group"){
            contacts = await this.loadCalContacts(this.groupId);
        } else {
            contacts = await this.loadFriends(userID);
        }

        contacts.sort((a,b) => a.name.localeCompare(b.name, "sv"));

        const grouped = contacts.reduce((result, contact) => {
            const letter = contact.name[0].toUpperCase();
            if (!result[letter]) result[letter] = [];
            result[letter].push(contact);
            return result;
        }, {});

        let contactHtml = "";

        for (const [letter, list] of Object.entries(grouped)) {
            contactHtml += `
                <div class="group">
                    <h4 class="first">${letter}</h4>
                    ${list.map(c => `<div class="card"><img src="../../../assets/icons/profile-dark.png">${c.name}</div>`).join("")}
                </div>
            `;
        }



        this.shadowRoot.innerHTML = `
            <style>
                .container {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .card {
                    display: flex;
                    align-items: center;
                    height: 48px;
                    padding: 8px;
                    background-color: rgba(0, 0, 0, 0.17);
                    gap: 8px;
                }
                img {
                    display: block;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            </style>
            <div class="container">
                ${contactHtml}
            </div>
        `;
    }

}

customElements.define("contact-card-container", ContactCardContainer);