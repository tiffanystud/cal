import { store } from "../../../store/store.js";

export class GroupDescription extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.cal;
        this.events = [];
        // store.subscribe("store:selected:calendar", function () {
        //     this.render(calendar);
        // })

        store.subscribe("calendar:events", (data) => {
            this.cal = data.calInfo;
            this.events = data.calEvents;
            this.render();
        })
    }

    html() {
        return `
        <div>
            <h1>${this.cal.name}</h1>
            <p>Klassgrupp för ${this.cal.name}</p>
        </div>
        `;
    }

    style() {
        return `
        <style>
            div {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        </style>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
        ${this.html()}
        ${this.style()} 
        `;
    }


}

customElements.define("group-description", GroupDescription);