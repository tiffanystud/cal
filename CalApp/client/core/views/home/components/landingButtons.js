import { LandingButton } from "./landingButton.js";
import { newRouter } from "../../../../index.js"
import { PubSub } from "../../../store/pubsub.js";

export class LandingButtonContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                #btn-container {
                    margin: 10px;
                    box-sizing: border-box;
                    width: 350px;
                    height: 80px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                ::slotted([active]) button {
                    background-color: #ffffff;
                }
            </style>
            <div id="btn-container">
                <slot></slot>
            </div>
        `;

        const slot = this.shadowRoot.querySelector("slot");
        slot.addEventListener("click", (e) => {
            const btn = e.target.closest("landing-button");
            if (!btn) return;

            // Ta bort active från alla knappar
            slot.assignedElements().forEach(b => b.removeAttribute("active"));

            // Sätt active på klickad knapp
            btn.setAttribute("active", "");

            // Kör din switchView (eller PubSub-event)
            const view = btn.getAttribute("view");
            this.switchView(view);
        });
    }

    switchView(view) {
        if (view == "home"){
            newRouter.navigate("/");
        } else {
            newRouter.navigate(`/home/${view}`);
        }
    }
}

customElements.define("landing-button-container", LandingButtonContainer);
