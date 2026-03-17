
import { PubSub } from "../../core/store/pubsub.js";

/* Komponent struktur

    A. Initialiseras med:
        <add-members
            titleElem="Add Admins">   -> Syns i UI
            userListName="admins">   -> Används för att skapa calendar (se B)
        </add-members>

    B. Förväntar sig att skicka värde när: 
        - En knapp i viewn (t.ex. #createBtn) hämtar värdena och skicka dem vidare.
            ..eventList."click".. => {
                document.querySelector('add-members[userListName="admins"]').getValue();
            }"   
    
    C. Varje view:
        - Hämta komponentens värde via getValue()
        - Skicka vidare data (ex. via PubSub > API)

    D. Komponenten:
        - Öppna SearchModal via PubSub
        - Ta emot valda users via PubSub
        - getValue() som ger public API
        
*/

export class AddMembers extends HTMLElement {
    
    allMembers = [];
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = `
            <style>
                .titleElem {
                    margin-bottom: 2px;
                }

                .members-container {
                    display: flex;
                    flex-direction: row;
                }

                .added-members-container {
                    display: flex;
                }

                .member-cirkle {
                    background-color: lightgray;
                    padding: 8px;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    box-sizing: border-box;
                }

                .add-member-btn {
                    background-color: rgb(179, 179, 179);
                    text-align: center;
                    border: 2px solid rgb(45, 45, 45);
                }

                .add-member-btn:hover {
                    cursor: pointer;
                }

                .member-add-margin {
                    margin-left: -15px;
                }
            </style>    
                    
            <div class="container-calendar-members">
                
                <h3 class="titleElem"></h3>
                
                <div class="members-container">
                    
                    <div class="added-members-container"></div>
                                        
                    <div class="add-member-btn member-cirkle">+</div>
                        
                </div>
                
            </div>
        `;
    }    
    
    // Set title, Toggle membership (pubsub.sub), Open search modal (pubsub.pub)
    connectedCallback() {
        
        this.titleElem = this.shadowRoot.querySelector(".titleElem");
        this.addMemberBtn = this.shadowRoot.querySelector(".add-member-btn");
        this.membersContainer = this.shadowRoot.querySelector(".added-members-container");
    
        // Sets title modularly
        this.shadowRoot.querySelector(".titleElem").textContent = this.getAttribute("titleElem") || "Add user";
        
        // When user clicks "+"
        this.addMemberBtn.addEventListener("click", () => {
            PubSub.publish("Users::OpenSearchModal"); // Eller liknade
        });
        
        // Global listener and toggle member (unsubscribed later in disconnectedCallback)
        this.unsubscribe = PubSub.subscribe("Users::UserSelected", componentData => {
            
            if (componentData.context !== this) return; // Ignore if events not for "this" (comp.)
            this.toggleMembership(componentData.user);
        
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
    
    // Create DOM elems
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
    
    // Give BG colors to renderMembers
    randomColor() {
        const colors = ["#ff9999", "#99ccff", "#b7e2e6", "#ffcc99", "#d0b8ac", "#cc99ff", "#cdb4db", "#99ffcc", "#acd8aa", "#add8e6", "#81c6e8"  ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // Public API
    getValue() {
        return this.allMembers;
    }
}

customElements.define("add-members", AddMembers);