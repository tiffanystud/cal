
import { EVENTS } from "../../core/store/Events.js";
import { PubSub } from "../../core/store/P subsub.js";

export class CreatePopup extends HTMLElement {
    
    constructor() {
        
        super();
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = `
           <style>
                .create-popup-container {
                    display: none;
                    background-color: lightblue;
                    padding: 20px;
                    border-radius: 20px 20px 0 0;
                }
                
                .content-div {
                    display: flex;
                    flex-direction: column;
                    gap: 10px; 
                }
                
                .create-btn {
                    display: flex;
                    padding: 5px 8px;
                    border-radius: 5px;
                    justify-content: space-between;
                    background-color: blanchedalmond; 
                }
                
                .create-btn:hover {
                    cursor: pointer;
                }
            </style>
        
            <div class="create-popup-container">
        
                <h3 class="create-popup-title">Create</h3>
                
                <div class="content-div">
                
                
                    <div class="create-btn create-event">
                        <p class="create-event-title">New Personal Event</p>
                        <p class="button-arrow">></p>
                    </div>  
                    
                    <div class="create-btn create-group">
                        <p class="create-event-group">New Group</p>
                        <p class="button-arrow">></p>
                    </div>  
                
                </div>
                
                <button class="close-btn">Close</button>
                
            </div>
        `;
        
        this.subs();
        
    }
    
    subs () {
        
        const popup = this.shadowRoot.querySelector(".create-popup-container");
        
        // Open popup
        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.CREATEPOPUP, () => {
                popup.style.display = "block";
            }
        );

        // Close popup
        PubSub.subscribe(EVENTS.VIEW.POPUP.CLOSE.CREATEPOPUP, () => {
                popup.style.display = "none";
            }
        );
        
    }
    
    connectedCallback() {
        
        const eventBtn = this.shadowRoot.querySelector(".create-event");
        const groupBtn = this.shadowRoot.querySelector(".create-group");
        const closeBtn = this.shadowRoot.querySelector(".close-btn");
        
        eventBtn.addEventListener("click", () => {
            PubSub.publish(EVENTS.VIEW.POPUP.SHOW.CREATEEVENT)
        });
        
        groupBtn.addEventListener("click", () => {
            PubSub.publish(EVENTS.VIEW.POPUP.SHOW.CREATEGROUP)
        });

        closeBtn.addEventListener("click", () => {
            PubSub.publish(EVENTS.VIEW.POPUP.CLOSE.CREATEPOPUP);
        });
        

    }
    
    
    
}

customElements.define("create-popup", CreatePopup);