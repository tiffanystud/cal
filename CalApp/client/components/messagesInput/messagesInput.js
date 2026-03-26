import { AppInput } from "../appInput/appInput.js";

export class MessagesInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/components/messagesInput/messagesInput.css">
        `
        let appInput = document.createElement("app-input");
        appInput.setAttribute("placeholder", "Write message here...");
        this.shadowRoot.appendChild(appInput);
        
        let sendIcon = document.createElement("button");
        sendIcon.innerHTML = "<img src='../assets/icons/send-dark.png' alt='Send Icon'>";
        this.shadowRoot.appendChild(sendIcon);

        sendIcon.addEventListener("click", () => {
            console.log(appInput.getValue());

            //Publish new event, send message to db
        });
    }
}

customElements.define("messages-input", MessagesInput);