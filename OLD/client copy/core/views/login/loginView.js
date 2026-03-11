export class LoginView extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.currentView = "login";
    }
    connectedCallback(){
        this.render()
    }

    switchView(view){
        this.currentView = view;
        this.render()
    }
    render(){

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/core/views/login/loginView.css">
            
            <h2>Welcome</h2>
            
            <app-input
                label="Description"
                placeholder="Enter username"
                width="100%"
                height="100px"
                id="username"
            ></app-input>
            
            <app-input
                label="Description"
                placeholder="Enter password"
                width="100%"
                height="100px"
                id="password"
            ></app-input>
            
            <button id="Log in">Login</button>
        `;
    }

}

customElements.define("login-view", LoginView)