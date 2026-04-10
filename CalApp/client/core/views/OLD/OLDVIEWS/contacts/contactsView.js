import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";
import { apiRequest } from "../../services/api.js";
import "./components/contactCardContainer.js"

export class ContactsView extends HTMLElement {
    constructor() {
        super();
        this.content = document.querySelector("#content");
        this.attachShadow({ mode: "open" });
        this.sub();
    }
    sub() {

        PubSub.subscribe("change:page", (data) => {

            if (data.page === "contacts") {
                this.render();
            }

        });

        PubSub.subscribe("change:view", (data) => {

            if (data.mainPath === "home" && data.subPath === "contacts") {
                this.render();
            }

        });
        
        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.ANY, (data) => {

            if (data.page === "contacts") {
                this.render();
            }

        }, true);
        
        PubSub.subscribe("change:view", (data) => {

            if (data.mainPath === "home" && data.subPath === "contacts") {
                this.render();
            }

        });


    }

    async render() {
        const params = new URLSearchParams(location.search);
        const isGroupContext =
            //            location.pathname.startsWith("home/groups") &&
            params.has("id");
        const groupId = params.get("id");
        let context = "My Contacts";
        if (isGroupContext) {
            try {
                const group = await apiRequest({
                    entity: `calendars?id=${groupId}`,
                    method: "GET"
                })
                context = group.name;

            } catch (err) {
                return err;
            }
        }
        this.content.innerHTML = `
        <style>
            app-input{
                display: inline-block;
            }
            .view {
                margin: 10px;
                display: flex;
                flex-direction: column;
                justify-contents: center;
                font-family: Helvetica;
            }
            h3{
            text-align: center;
            font-size: 14px;
            }
        </style>
        <div class="view">
            <div class="rubrik"></div>
            <h3>${context}</h3>
            <app-input placeholder="Search" width="350px"></app-input>
            <contact-card-container context="${isGroupContext ? "group" : "friends"}" group-id="${groupId || ''}"></contact-card-container>
        </div>
        `;

    }

}

customElements.define("contacts-view", ContactsView)

new ContactsView();

