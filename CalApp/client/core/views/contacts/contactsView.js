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
                this.renderMyContacts();
            }

        });
        PubSub.subscribe("change:view", (data) => {
            if (data.page === "contacts"){
                this.renderMyContacts();
            }

        });
    }
    renderMyContacts(){
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
            }
            h3{
            text-align: center;
            font-size: 14px;
            font-family: Helvetica;
            }
        </style>
        <landing-button-container>
            <landing-button label="My Calendar" view="home" active></landing-button>
            <landing-button label="My Groups" view="groupcalendar"></landing-button>
        </landing-button-container>
        <div class="view">
            <div class="rubrik"></div>
            <h3>My Contacts</h3>
            <app-input placeholder="Search" width="350px"></app-input>
            <contact-card-container></contact-card-container>
        </div>
        <bottom-nav></bottom-nav>
        `;

    }
    

    render(){

        this.app.innerHTML = `
        <landing-button-container>
            <landing-button label="My Calendar" view="home" active></landing-button>
            <landing-button label="My Groups" view="groupcalendar"></landing-button>
        </landing-button-container>
        <bottom-nav></bottom-nav>
        `;

    }

}

customElements.define("contacts-view", ContactsView)

new ContactsView();