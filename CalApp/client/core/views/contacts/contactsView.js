import { store } from "../../store/store.js";
import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";
import { BottomNav } from "../../../components/bottomNav/bottomNav.js";
import { LandingButtonContainer } from "../home/components/landingButtons.js";
import { AppInput } from "../../../components/appInput/appInput.js";
import { ContactCardContainer } from "./components/contactCardContainer.js";


export class ContactsView extends HTMLElement{
    constructor(){
        super();
        this.app = document.querySelector("#app");
        this.attachShadow({mode: "open"});
        this.sub();
    }
    sub() {
        PubSub.subscribe("change:page", (data) => {
            if (data.page === "contacts"){
                this.render();
            }

        });
        PubSub.subscribe("change:view", (data) => {
            if (data.page === "contacts"){
                this.render();
            }

        });
    }
    render(){
        const params = new URLSearchParams(location.search);
        const isGroupContext =
            location.pathname.startsWith("/groups") &&
            params.has("id");
        const groupId = params.get("id");
        this.app.innerHTML = `
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
        <landing-button-container>
            <landing-button label="My Calendar" view="home" ${isGroupContext ? "" : "active"}></landing-button>
            <landing-button label="My Groups" view="groupcalendar"${isGroupContext ? "active" : ""}></landing-button>
        </landing-button-container>
        <div class="view">
            <div class="rubrik"></div>
            <h3>My Contacts</h3>
            <app-input placeholder="Search" width="350px"></app-input>
            <contact-card-container context="${isGroupContext ? "group" : "friends"}" group-id="${groupId || ''}"></contact-card-container>
        </div>
        <bottom-nav></bottom-nav>
        `;

    }

}

customElements.define("contacts-view", ContactsView)

new ContactsView();

