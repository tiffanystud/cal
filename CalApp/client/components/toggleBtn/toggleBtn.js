export class ToggleBtn extends HTMLElement { 
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        const inactiveHeaderText = this.getAttribute("inactive-header-text");
        const inactiveInfoText = this.getAttribute("inactive-info-text");

        const activeHeaderText = this.getAttribute("active-header-text");
        const activeInfoText = this.getAttribute("active-info-text");

        this.shadowRoot.innerHTML = `
            <style>
                .containier {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    padding-top: 10px;
                    padding-bottom: 10px;
                    background-color: none;
                    border-radius: 8px;
                    border: 0px solid #ccc;
                    box-sizing: border-box;
                    width: 100%;
                    margin-bottom: 5px;
                }

                .button-container {
                    display: flex;
                    justify-content: center;
                    align-content: center;
                }

                .info-text {
                    color: rgb(71, 70, 70);
                    margin: 0;
                    font-size: small;
                }

                .header-text {
                    color: rgb(57, 57, 57);
                    font-size: large;
                    margin-top: 3px;
                    margin-bottom: 5px;
                }

                .switch {
                position: relative;
                display: inline-block;
                width: 30px;
                height: 17px;
                }

                /* Hide default HTML checkbox */
                .switch input {
                opacity: 0;
                width: 0;
                height: 0;
                }

                /* The slider */
                .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
                }

                .slider:before {
                position: absolute;
                content: "";
                height: 13px;
                width: 13px;
                left: 2px;
                bottom: 2px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
                }

                input:checked + .slider {
                background-color: #2196F3;
                }

                input:focus + .slider {
                box-shadow: 0 0 1px #2196F3;
                }

                input:checked + .slider:before {
                -webkit-transform: translateX(26px);
                -ms-transform: translateX(26px);
                transform: translateX(13px);
                }

                /* Rounded sliders */
                .slider.round {
                border-radius: 34px;
                }

                .slider.round:before {
                border-radius: 50%;
                }
            </style>

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
