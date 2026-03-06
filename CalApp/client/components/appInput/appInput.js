
export class AppInput extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        // SE ÖVER **, följ Eriks förslag ist
        this.shadowRoot.innerHTML = `
            <style>
                @import "./appInput.css";
            </style>
            
            <label class="label"></label>
            <input class="input" />
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