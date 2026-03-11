export class HomeView extends HTMLElement{
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

        this.shadowRoot.innerHTML = ``;
    }

}

customElements.define("login-view", LoginView)