import { store } from "../../store/store.js";
import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";
import { LandingButtonContainer } from "./components/landingButtons.js";
import { CalDetailBtn } from "./components/calDetailBtn.js";
import { CalRender } from "./components/calRender.js";
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
        <cal-detail-btn></cal-detail-btn>
        <cal-render></cal-render>
        <bottom-nav></bottom-nav>
        `;
    }

}

customElements.define("home-view", HomeView)

new HomeView();