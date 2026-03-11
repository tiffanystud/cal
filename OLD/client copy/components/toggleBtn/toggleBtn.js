
export class ToggleBtn extends HTMLElement { 
    
        constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        // Sätt attribut
        const inactiveHeaderText = this.getAttribute("inactive-header-text");
        const inactiveInfoText = this.getAttribute("inactive-info-text");

        const activeHeaderText = this.getAttribute("active-header-text");
        const activeInfoText = this.getAttribute("active-info-text");

        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/toggleBtn/toggleBtn.css">

            <div class="containier">
            
                <div class="text-container">
                    <h3 class="component-text header-text">${inactiveHeaderText}</h3>
                    <p class=" component-text info-text">${inactiveInfoText}</p>
                </div>
                
                <div class="button-container">
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </div>
            
            </div>
        `
        
        // Vid toggle:
        const checkbox = this.shadowRoot.querySelector("input");
        const headerTextElem = this.shadowRoot.querySelector(".header-text");
        const infoTextElem = this.shadowRoot.querySelector(".info-text");

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                headerTextElem.textContent = activeHeaderText;
                infoTextElem.textContent = activeInfoText;
            } else {
                headerTextElem.textContent = inactiveHeaderText;
                infoTextElem.textContent = inactiveInfoText;
            }
        });



    }
}

customElements.define("toggle-btn", ToggleBtn);
