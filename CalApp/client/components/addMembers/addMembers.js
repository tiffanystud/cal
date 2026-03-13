import { PubSub } from "../../core/store/pubsub";

// Ha bara globala eventlisteners som ej krockar med view specifika. Håll modulärt 
export class AddMembers extends HTMLElement {
    
    allMembers = [];
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/addMembers/addMembers.css">
            
            <div class="container-calendar-members">
                
                <h3 class="title"></h3>
                
                <div class="members-container">
                    
                    <div class="added-members-container"></div>
                                        
                    <div class="add-member-btn member-cirkle">+</div>
                        
                </div>
                
            </div>
        `;
    }
    
    connectedCallback() {
        
        this.title = this.shadowRoot.querySelector(".title");
        this.addMemberBtn = this.shadowRoot.querySelector(".add-member-btn");
        this.membersContainer = this.shadowRoot.querySelector(".added-members-container");
    
        // Set title modularly
        this.shadowRoot.querySelector(".title").textContent = this.getAttribute("title") || "";
        
        // When user clicks "+", open a search modal? -> *** TODO ***
        this.addMemberBtn.addEventListener("click", () => {
            PubSub.publish("Members::OpenSearchModal"); // Eller liknade
        });
        
        // Global listeneer and toggle member
        // Måste unsubscribas senare (disconnectedCallback)
        this.unsubscribe = PubSub.subscribe("Members::UserSelected", selectedUser => {
            this.toggleMembership(selectedUser);
        });
    }
    
    // Remove the global listener when the component no longer is in use/DOM
    disconnectedCallback() {
        if (this.unsubscribe) this.unsubscribe();
    }
    
    // Add or remove user
    toggleMembership(user) {
        
        const userIsMember = this.allMembers.some(currMember => currMember.id == user.id);
        
        if (userIsMember) {
            // Remove membership if existing member
            this.allMembers = this.allMembers.filter(currMember => currMember.id !== user.id);
        } else {
            // Add user
            this.allMembers.push(user);
        }
        
        this.renderMembers();
    }
    
    renderMembers() {
        
        this.membersContainer.innerHTML = "";
        
        // Limit to max 15 displayed users 
        const visibleMembers = this.allMembers.slice(0, 15);
        
        visibleMembers.forEach((currMember, index) => {
            
            const newDiv = document.createElement("div");
            
            // Basic styling for all cirkles (inc. add btn)
            newDiv.classList.add("member-cirkle");
            
            // First cirkle no negative margin (styling)
            if (index == 0) {
                newDiv.classList.add("member-no-margin");
            } else {
                newDiv.classList.add("member-add-margin");
            }
            
            // Give random BG COLOR
            newDiv.style.backgroundColor = this.randomColor();

            this.membersContainer.appendChild(newDiv);
        });
    }
    
    randomColor() {
        const colors = ["#ff9999", "#99ccff", "#ffcc99", "#cc99ff", "#99ffcc"];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Public API
    getValue() {
        return this.allMembers;
    }
}

customElements.define("add-members", AddMembers);