import {apiRequest} from "/core/services/api.js"
import {store} from "/core/store/store.js"


export default class EditProfile extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode : "open"});
        this.state = store.getState();

        this.shadowRoot.innerHTML = `
            <style>
                #container {
                    display:flex;
                    flex-direction: column;
                }
                #container div {
                    margin-top: 7px;
                    background-color: #999898;
                    padding: 8px;
                    border-radius: 10px;
                }
                
            </style>
            <div id="container">
                <div id="usernameDiv">
                    <app-input placeholder="New username"></app-input>
                    <regular-button>Save changes</regular-button>
                </div>
                <div id="passDiv">
                    <app-input placeholder="New password"></app-input>
                    <regular-button>Save changes</regular-button>

                </div>
                <div id="emailDiv">
                    <app-input placeholder="New email"></app-input>
                    <regular-button>Save changes</regular-button>
                </div>
                
            </div>
        `
        this.logic();
    }
    logic() {
        const usernameDiv = this.shadowRoot.getElementById("usernameDiv");
        const passDiv = this.shadowRoot.getElementById("passDiv");
        const emailDiv = this.shadowRoot.getElementById("emailDiv");

        const usernameBtn = usernameDiv.querySelector("regular-button");
        const passBtn = passDiv.querySelector("regular-button");
        const emailBtn = emailDiv.querySelector("regular-button");

        usernameBtn.addEventListener("click", () => { 
            const appInput = usernameDiv.querySelector("app-input");
            const inputElement = appInput.shadowRoot.querySelector("input"); 
            this.updateUsername(inputElement.value); 
        })
        passBtn.addEventListener("click", () => {
            const appInput = passDiv.querySelector("app-input");
            const inputElement = appInput.shadowRoot.querySelector("input"); 
            this.updatePass(inputElement.value);
        })
        emailBtn.addEventListener("click", () => {
            const appInput = emailDiv.querySelector("app-input");
            const inputElement = appInput.shadowRoot.querySelector("input"); 
            this.updateEmail(inputElement.value);
        })
    
    }
    async updateUsername(inputValue) {
        const sendObj = {
            entity: "users",
            method: "PATCH",
            body: {
                id: this.state.isLoggedIn.id,
                name: inputValue
            }
        }
        try {
            let data = await apiRequest(sendObj);
            if(typeof(data) === "object") {
                store.setState({isLoggedIn: {
                    ...store.getState().isLoggedIn,
                    username: inputValue
                }});
            }
        } catch(error) {

        }
    }
    async updatePass(inputValue) {
        const sendObj = {
            entity: "users",
            method: "PATCH",
            body: {
                id: this.state.isLoggedIn.id,
                pwd: inputValue
            }
        }
        try {
            let data = await apiRequest(sendObj);

        } catch(error) {

        }
    }
    async updateEmail(inputValue) {
        const sendObj = {
            entity: "users",
            method: "PATCH",
            body: {
                id: this.state.isLoggedIn.id,
                email: inputValue
            }
        }
        try {
            let data = await apiRequest(sendObj);

            store.setState({isLoggedIn: {
                ...store.getState().isLoggedIn,
                email: inputValue
            }});

        } catch(error) {

        }

    }
}
customElements.define("profile-edit-comp", EditProfile);
