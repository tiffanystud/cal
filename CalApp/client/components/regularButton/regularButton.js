export class RegularButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/components/regularButton/regularButton.css">
        <button></button>
        `

        this.shadowRoot.querySelector("button").textContent = this.textContent;
    }
}

customElements.define("regular-button", RegularButton);