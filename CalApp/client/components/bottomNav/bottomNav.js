
export class ToggleBtn extends HTMLElement { 
    
        constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/toggleBtn/toggleBtn.css">

            <div class="containier">
            
                <div class="text-container">
                    <h3 class="component-text header-text">Header text</h3>
                    <p class=" component-text info-text">Info text (change on click if needed)</p>
                </div>
                
                <div class="button-container">
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                </div>
            
            </div>
        `
        }
}

customElements.define("toggle-btn", ToggleBtn);
