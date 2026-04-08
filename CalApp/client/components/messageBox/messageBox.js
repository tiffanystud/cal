/* 

*/

export class MessageBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/components/messageBox/messageBox.css">
            <label id="sender-date">${this.users.sender.name} - ${this.message.date}, ${this.message.time}</label>
            <div id="message">
                <p id="content">${this.message.content}</p>
            </div>
        `

        if (this.alignRight) {
            this.shadowRoot.querySelector("label").classList.add("right-label");
            this.shadowRoot.querySelector("#message").classList.add("right-msg");
        }

        if (this.bg) {
            if (typeof this.bg !== "string") return false;
            this.shadowRoot.querySelector("#content").style.backgroundColor = this.bg;
        }
    }
}

customElements.define("message-box", MessageBox);