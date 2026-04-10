class PasswordInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow = ({ mode: "open" });
        this.render();
    };

    render() {
        this.innerHTML = `
            <input type="passeord">
        `
    }

}

customElements.define("password-input", PasswordInput);
