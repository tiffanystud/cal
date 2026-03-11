
import { EVENTS } from "/CalApp/client/core/store/events.js"
import { store } from "/CalApp/client/core/store/store.js"

export class BottomNav extends HTMLElement { 
    
        constructor() {
        super();
        this.attachShadow({ mode: "open" });
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/components/bottomNav/bottomNav.css">

            <div class="button-container">
                
                <button class="nav-btn home">
                    <img class="icon-dark" src="/CalApp/client/assets/icons/home-dark.png">
                    <img class="icon-light" src="/CalApp/client/assets/icons/home-light.png">
                </button>
                
                <button class="nav-btn users">
                    <img class="icon-dark" src="/CalApp/client/assets/icons/users-dark.png">
                    <img class="icon-light" src="/CalApp/client/assets/icons/users-light.png">
                </button>
                
                <button class="nav-btn add">
                    <img class="icon-dark" src="/CalApp/client/assets/icons/add-dark.png">
                    <img class="icon-light" src="/CalApp/client/assets/icons/add-light.png">
                </button>
                
                <button class="nav-btn notiflications">
                    <img class="icon-dark" src="/CalApp/client/assets/icons/send-dark.png">
                    <img class="icon-light" src="/CalApp/client/assets/icons/send-light.png">
                </button>
                
                <button class="nav-btn profile">
                    <img class="icon-dark" src="/CalApp/client/assets/icons/profile-dark.png">
                    <img class="icon-light" src="/CalApp/client/assets/icons/profile-light.png">
                </button>
                
            </div>
            `;
        }
        
        connectedCallback(){
            
            const buttons = this.shadowRoot.querySelectorAll(".nav-btn");
            
            // Lägg till eventlisteners
            buttons.forEach(currBtn => {
                currBtn.addEventListener("click", () => {
                    
                    // Rensa active på alla icons
                    buttons.forEach(btn => btn.classList.remove("activeBtn"))
                    
                    currBtn.classList.add("activeBtn");
                    
                    // "home", "users", "add" ... etc
                    const currPage = currBtn.classList[1];
                    
                    // Sätt page till vad man trycker på
/*                     store.setState({
                        data: {
                            ...store.getState().data,
                            pages: {
                                currentPage: currPage
                            }
                        }
                    }); */
                    
                    // se över i events 
                    // store.notify(EVENTS.STORE.UPDATED)
                    
                })
            })
            
        }
}



customElements.define("bottom-nav", BottomNav);
