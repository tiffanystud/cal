class UserNameInput extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <input type="text">
            <style>

            </style>
        `;
    }
}

customElements.define("username-input", UserNameInput);