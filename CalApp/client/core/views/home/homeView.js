import { store } from "../../store/store.js";
import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";
import { LandingButton } from "./components/button.js";
import { MyCalLandingView } from "./components/myCalLandingView.js";
import { GroupLandingView } from "../groupLanding/components/groupLanding2.js";

export class HomeView extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.currentView = "my-calendar";
        store.subscribe("pageChanged", () => {
            if (store.pages.currentPage === "home") {
                this.render();
            }
            if (store.pages.currentPage === "my-groups"){
                this.currentView = "my-groups";
                this.render();
            }
        });
    }
    connectedCallback(){
        console.log("homeview mounted")
        this.render()
    }

    switchView(view){
        this.currentView = view;
        this.render()
    }
    render(){
        const view = this.currentView === "my-calendar"
        ? "<my-calendar></my-calendar>"
        : `<my-groups></my-groups>`;

        this.shadowRoot.innerHTML = `
        <style>
            :host{
                display: block;
            }
            #btn-container{
                width: 350px;
                height: 80px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .active landing-button{
                background-color: #ffffff;
            }
        </style>
        <div id="btn-container">
            <landing-button label="My Calendar" view="my-calendar" ${this.currentView === "my-calendar" ? "active" : ""}></landing-button>
            <landing-button label="My Groups" view="my-groups" ${this.currentView === "my-groups" ? "active" : ""}></landing-button>
        </div>
        <div class="view">
        ${view}
        </div>
        `;
        this.shadowRoot
          .querySelectorAll("landing-button")
          .forEach(btn => {
        
            btn.addEventListener("click", () => {
                const view = btn.getAttribute("view");
                this.switchView(view);
            });
        
        });
    }

}

customElements.define("home-view", HomeView)