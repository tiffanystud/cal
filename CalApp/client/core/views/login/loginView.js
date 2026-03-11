import "./components/button.js";
import "./components/passwordInput.js";
import "./components/userNameInput.js"


export class LoginView extends HTMLElement {
    constructor() {
        super();
        this.app = app;
        this.currentView = "login";
    }

    render() {

        this.app.innerHTML = `

            <h2>Login</h2>

                <username-input></username-input>
                <password-input></password-input>
                <login-button></login-button>
            
            <style>
                #app {
                    display: flex;
                    flex-direction: column;
                    gap: 25px;
                }

            </style>
        `;
    }

}

customElements.define("login-view", LoginView)