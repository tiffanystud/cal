export class MessageBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/components/messageBox/messageBox.css">
        <p>${this.message.content}</p>
        `
    }
}

customElements.define("message-box", MessageBox);