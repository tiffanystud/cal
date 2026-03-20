import { store } from "../../store/store.js";
import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";
import { LandingButtonContainer } from "./components/landingButtons.js";
import { MyCalLandingView } from "./components/myCalLandingView.js";
import { BottomNav } from "../../../components/bottomNav/bottomNav.js";


export class HomeView extends HTMLElement {
    constructor() {
        super();
        this.app = document.querySelector("#app");
        this.attachShadow({ mode: "open" });
        this.currentView = "my-calendar";
        this.sub();
    }
    sub() {
        PubSub.subscribe("change:view", (data) => {
            if (data.url.pathname === "/") {
                this.render();
            }
            if (data.url === "/home") {
                this.render();
            }
        })
        PubSub.subscribe("change:page", (data) => {
            if (data.page === "home") { //bottom Nav
                this.render();
            }
        });
    }

    render() {

        this.app.innerHTML = `
        <landing-button-container>
            <landing-button id="myCalBtn" label="My Calendar" view="home" active></landing-button>
            <landing-button id="myGroupsBtn" label="My Groups" view="groupcalendar"></landing-button>
        </landing-button-container>
        <my-calendar></my-calendar>
        <bottom-nav></bottom-nav>
        `;

        const myGroupsBtn = this.app.querySelector("#myGroupsBtn");
        const myCalBtn = this.app.querySelector("#myCalBtn");

        myGroupsBtn.addEventListener('click', () => {
            PubSub.publish('change:page', {
                page: 'myGroups'

            });
        });

        // Byt ut så att home?id=2 är en "group/calendar"


        // Här publicerar knapptrycket ett event så myCal kan dyka upp
        myCalBtn.addEventListener('click', () => {
            PubSub.publish('change:page', {
                page: 'myCal'
            });
        });

    }

}

customElements.define("home-view", HomeView)

new HomeView();