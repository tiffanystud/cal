
import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";
import { LandingButtonContainer } from "./components/landingButtons.js";
import { NotificationsBar } from "../../../components/notificationsBar/notificationsBar.js";
import { CalDetailBtn } from "./components/calDetailBtn.js";
import { CalRender } from "./components/calRender.js";
import { BottomNav } from "../../../components/bottomNav/bottomNav.js";
import "./components/searchTagsBtn.js";
import "../../../components/searchUsersModal/searchUsersModalTest.js";
import "./components/eventCardPopup.js";

export class HomeView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.currentView = "my-calendar";
        this.sub();
    }

    sub() {

        PubSub.subscribe("change:view", (data) => {
            if (data.url === "/home") {
                this.render();
            }
        })
        
        PubSub.subscribe("change:page", (data) => {
            if (data.page === "home") {
                this.render();
            }
        })

        PubSub.subscribe(EVENTS.AUTH.LOGIN.SUCCESS, () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" }, true);
        }, true);

        PubSub.subscribe(EVENTS.AUTH.LOGOUT.SUCCESS, () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" }, true);
        }, true);
        
        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.HOME, (data) => {
            if (data.page === "home") {
                this.render();
            }
        }, true);

        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.ANY, (data) => {
            if (data.page === "home") { //bottom Nav
                this.render();
            }
        }, true);

    }

    render() {
        let content = document.querySelector("#content")
        content.innerHTML = `
        <notifications-bar></notifications-bar>
        <detail-container></detail-container>
        <filter-cals></filter-cals>
        <week-chart></week-chart>
        <search-tags></search-tags>
        <event-cards></event-cards>
        <create-popup></create-popup>
        <search-users-modal-test></search-users-modal-test>
        <event-card-popup></event-card-popup>
        `;

    }

}

customElements.define("home-view", HomeView)

new HomeView();
