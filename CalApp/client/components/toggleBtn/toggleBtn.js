export class ToggleBtn extends HTMLElement { 
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        const inactiveHeaderText = this.getAttribute("inactive-header-text");
        const inactiveInfoText = this.getAttribute("inactive-info-text");

        const activeHeaderText = this.getAttribute("active-header-text");
        const activeInfoText = this.getAttribute("active-info-text");

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/toggleBtn/toggleBtn.css">

            <div class="containier">
            
                <div class="text-container">
                    <h3 class="component-text header-text">${inactiveHeaderText}</h3>
                    <p class="component-text info-text">${inactiveInfoText}</p>
                </div>
                
                <div class="button-container">
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </div>
            
            </div>
        `;
        
        // Sätt attribut
        this.checkbox = this.shadowRoot.querySelector("input");
        this.headerTextElem = this.shadowRoot.querySelector(".header-text");
        this.infoTextElem = this.shadowRoot.querySelector(".info-text");

        // Vid toggle
        this.checkbox.addEventListener("change", () => {
            if (this.checkbox.checked) {
                this.headerTextElem.textContent = activeHeaderText;
                this.infoTextElem.textContent = activeInfoText;
            } else {
                this.headerTextElem.textContent = inactiveHeaderText;
                this.infoTextElem.textContent = inactiveInfoText;
            }
        });
    }

    // Public API
    getValue() {
        return this.checkbox.checked ? "public" : "private";
    }
}

customElements.define("toggle-btn", ToggleBtn);
