import "./eventCard.js"

export class GroupLandingView extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host{
                    display: block;
                }
            </style>
            <event-cards></event-cards>
        `;
    }

}

customElements.define("my-groups", GroupLandingView);