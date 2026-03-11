

class LoginButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    render() {
        this.innerHTML = `
            <button>Login</button>
        `
    }

}

customElements.define("login-button", LoginButton);