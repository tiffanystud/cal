

class LandingButton extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        //if (!this.shadowRoot) return;
        const btnId = this.getAttribute("id");
        const label = btnId === "my-cal" ? "My Calendar" : "My Groups";
        this.shadowRoot.innerHTML = `
         <style>
            button {
                height: 54px;
                width: 170px;
                font-weight: 600;
                background-color: #858585;
                border: none;
            }
        </style>
        <button>${label}</button>
        `;
    }
    
}

customElements.define("landing-button", LandingButton);