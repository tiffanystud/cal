
import { EVENTS } from "../../core/store/events.js"
import { PubSub } from "../../core/store/pubsub.js";
import { newRouter } from "../../index.js";

export class BottomNav extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
                <style>
                    .icon-light {
                        display: none;
                    }
                    .nav-btn.activeBtn .icon-dark {
                        display: none;
                    }
                    .nav-btn.activeBtn .icon-light {
                        display: inline;
                    }
                    .button-container {
                        border-top: 1px solid gray;
                        width: 390px;
                        display: flex;
                        justify-content: space-around;
                        padding-top: 12px;
                        padding-bottom: 12px;
                        box-sizing: border-box;
                        background-color: grey;
                    }
                    .nav-btn {
                        background: none;
                        border: none;
                    }
                    .nav-btn:hover {
                        cursor: pointer;
                    }
                </style>

                <div class="button-container">
                    
                    <button class="nav-btn home">
                        <img class="icon-dark" src="/../../assets/icons/home-dark.png">
                        <img class="icon-light" src="/../../assets/icons/home-light.png">
                    </button>
                    
                    <button class="nav-btn contacts">
                        <img class="icon-dark" src="/../../assets/icons/users-dark.png">
                        <img class="icon-light" src="../../assets/icons/users-light.png">
                    </button>
                    
                    <button class="nav-btn add">
                        <img class="icon-dark" src="/../../assets/icons/add-dark.png">
                        <img class="icon-light" src="/../../assets/icons/add-light.png">
                    </button>
                    
                    <button class="nav-btn chat">
                        <img class="icon-dark" src="/../../assets/icons/chat-dark.png">
                        <img class="icon-light" src="/../../assets/icons/chat-light.png">
                    </button>
                    
                    <button class="nav-btn profile">
                        <img class="icon-dark" src="/../../assets/icons/profile-dark.png">
                        <img class="icon-light" src="/../../assets/icons/profile-light.png">
                    </button>
                    
                </div>
                `;
    }

    connectedCallback() {

        const buttons = this.shadowRoot.querySelectorAll(".nav-btn");

        // Lägg till eventlisteners
        buttons.forEach(currBtn => {

            currBtn.addEventListener("click", () => {

                // Ge rätt knapp light/dark icons
                buttons.forEach(btn => btn.classList.remove("activeBtn"))
                currBtn.classList.add("activeBtn");

                // "home", "users", "add" ... etc
                const currPage = currBtn.classList[1];

                PubSub.publish("change:page", {
                    page: currPage
                }); 
                
                PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, {
                    page: currPage
                }); 
                
                PubSub.publish(EVENTS.VIEW.PAGE.SHOW.ANY, {
                    page: currPage
                }); 
                
                this.switchView(currPage);

            })
        })

    }
    switchView(view) {

        const currentPath = window.location.pathname.split("/").filter(Boolean);
        const main = currentPath[0] || "home";

        if (view === "home") {
            newRouter.navigate(`/${main}`);
        } else {
            newRouter.navigate(`/${main}/${view}`);
        }

    }
}
customElements.define("bottom-nav", BottomNav);
