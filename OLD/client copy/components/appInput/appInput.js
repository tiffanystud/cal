
export class AppInput extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        // SE ÖVER **, följ Eriks förslag ist
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/appInput/appInput.css">
            
            <div class="label-input-container">
                <label class="label"></label>
                <input class="input" />
            </div>

        `
    }
    
    connectedCallback() {

        this.shadowRoot.querySelector(".label").textContent = this.getAttribute("label") || "";
            
        const inputField = this.shadowRoot.querySelector(".input");
        inputField.placeholder = this.getAttribute("placeholder") || "";
        inputField.value = this.getAttribute("value") || "";
        
        // Om view själv vill styra width
        const widthAttribute = this.getAttribute("width");
        if (widthAttribute) {
            this.style.width = widthAttribute;
        }
    
        // Om view själv vill styra height
        const heightAttribute = this.getAttribute("height");
        if (heightAttribute) {
            const container = this.shadowRoot.querySelector(".label-input-container");

            // Sätt till textattri om height, för att kunna styra höjd
            const textarea = document.createElement("textarea");
            textarea.classList.add("input");
            textarea.placeholder = this.getAttribute("placeholder") || "";
            textarea.style.height = heightAttribute;

            const oldInput = this.shadowRoot.querySelector("input");
            container.replaceChild(textarea, oldInput);
        }

    }
    
     // Komponentens "public API" 
    getValue() {
        const inputValue = this.shadowRoot.querySelector("input").value;
        return inputValue;
    }
    
    setValue(newValue) {
        this.shadowRoot.querySelector(".input").value = newValue;
    }
}

customElements.define("app-input", AppInput);


/* 
    <app-input  
        width="50%"
        label="Input-field header text"
        placeholder="Enter input"
    ></app-input>
    
*/