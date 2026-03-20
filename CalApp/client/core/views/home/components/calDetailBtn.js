import { store } from "../../../store/store.js";
import { PubSub } from "../../../store/pubsub.js";

export class CalDetailBtn extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.detail = "All";
        this.isOpen = false;
        this.render();
    }
    render(){
        const calendars = store.getState().cals;
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: inline-block;
                position: relative;
            }

            button {
                padding: 8px 16px;
                border: none;
                font: bold 16px Helvetica;
                text-decoration: underline;
                cursor: pointer;
            }

            #dropdown {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                background: #f9f9f9;
                min-width: 130px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                padding: 8px 0;
                z-index: 10;
            }

            #dropdown.open {
                display: block;
            }

            .item {
                padding: 8px 16px;
                cursor: pointer;
            }

            .item:hover {
                background: #eee;
            }
        </style>
        <button id="detail">${this.detail}</button>
        <div id="dropdown">
            <div class="item" id="All">All</div>
            ${calendars.map(c => `<div class="item" id="${c.id}">${c.name}</div>`).join("")}
        </div>
        `;

        this.setUpEvents();
    }

    setUpEvents(){
        const detailButton = this.shadowRoot.querySelector("#detail");
        const dropdown = this.shadowRoot.querySelector("#dropdown");

        let isDown = false;
        let holdTime = 1000;

        let clicked = 0;

        detailButton.addEventListener("pointerdown", () =>{
            if (isDown === false){
                isDown = true;
                setTimeout(() =>{
                    if (isDown){
                        this.toggleDropdown(true);
                    }
                }, (holdTime));
            }
        })
        detailButton.addEventListener("pointerup", () => {
            isDown = false;
            clicked = 1;
        })

        dropdown.addEventListener("click", (e) => {
            const item = e.target.closest(".item");
            if (!item) return;

            this.detail = item.textContent;
            detailButton.textContent = this.detail;
            PubSub.publish("change:detailbtn", item.id);
            this.toggleDropdown(false);
        });
        document.addEventListener("click", (e) => {
            if (clicked == 0){
                this.toggleDropdown(false)
            } else if (clicked == 1){
                clicked = 0;
            }
        });
    }

    toggleDropdown(open){
        this.isOpen = open;
        const dropdown = this.shadowRoot.querySelector("#dropdown");
        dropdown.classList.toggle("open", open);
    }

}

customElements.define("cal-detail-btn", CalDetailBtn);