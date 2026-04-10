export class LandingButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        //if (!this.shadowRoot) return;
        const label = this.getAttribute("label") || "Button";
        this.shadowRoot.innerHTML = `
         <style>
            :host{
                display:inline-block;
            }
            :host([active]) button{
                background:white;
            }
            button {
                height: 54px;
                width: 170px;
                font-weight: 600;
                background-color: #858585;
                border: none;
                cursor: pointer;
            }
        </style>
        <button>${label}</button>
        `;
    }

}

customElements.define("landing-button", LandingButton);