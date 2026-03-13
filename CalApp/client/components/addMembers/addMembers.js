
// Ha bara globala eventlisteners som ej krockar med view specifika. Håll modulärt 
export class AppInput extends HTMLElement {
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/addMembers/addMembers.css">
            
            <div class="container-calendar-members">
                
                <h3>Members</h3>
                
                <div class="members-container">
                    
                    <div class="added-members">

                    </div>
                                        
                    <div class="add-member-btn member-cirkle">
                        +
                    </div>
                        
                </div>
            </div>

        `
    }
    
    connectedCallback() {

        // se till att alla class="members" < members1 får rätt klass

        
        
        // Add button (add members)
        const addBtn = document.querySelector(".add-member-btn");
        addBtn.addEventListener("click", () => {
            // Fetcha nya användare
        })
        
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