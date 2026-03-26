import { store } from "../../store/store.js";
import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";
import { LandingButtonContainer } from "./components/landingButtons.js";
import { NotificationsBar } from "../../../components/notificationsBar/notificationsBar.js";
import { CalDetailBtn } from "./components/calDetailBtn.js";
import { CalRender } from "./components/calRender.js";
import { BottomNav } from "../../../components/bottomNav/bottomNav.js";
import "./components/searchTagsBtn.js";
import "../../../components/searchUsersModal/searchUsersModalTest.js";

export class HomeView extends HTMLElement {
    constructor() {
        super();
        this.app = document.querySelector("#app");
        this.attachShadow({ mode: "open" });
        this.currentView = "my-calendar";
        this.sub();
    }

    sub() {


        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.HOME, (data) => {
            if (data.page === "home") {
                this.render(data);
            }

        });

        PubSub.subscribe(EVENTS.STATE.LOGIN.SUCCESS, () => {
            // Re-render home, inloggad
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" });
        });

        PubSub.subscribe(EVENTS.STATE.LOGOUT.SUCCESS, () => {
            // Re-render home, utloggad
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" });
        });

        PubSub.subscribe("change:view", (data) => {

            // if (data.mainPath === "home" || "/") {
            //     this.render();
            // }
            /*             
                if (data.url.pathname === "/") {
                    this.render();
                } 
            */
            if (data.url === "/home") {
                this.render();
            }
        })

        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW, (data) => {
            if (data === "home") { //bottom Nav
                this.render();
            }
        });
    }

    render() {
        let content = document.querySelector("#content")
        content.innerHTML = `
        <notifications-bar></notifications-bar>
        <cal-detail-btn></cal-detail-btn>
        <filter-cals></filter-cals>
        <week-chart></week-chart>
        <search-tags></search-tags>
        <event-cards></event-cards>
        <create-popup></create-popup>
        <search-users-modal-test></search-users-modal-test>
        `;

    }

}

customElements.define("home-view", HomeView)

new HomeView();
