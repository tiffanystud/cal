import { store } from "../../store/store.js";
import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";

export class dummyLogin {

    constructor() {
        this.container = document.querySelector("#devLoginPanel");
        this.input = document.querySelector("#dummyUserId");
        this.loginBtn = document.querySelector("#dummyLoginBtn");
        this.logoutBtn = document.querySelector("#dummyLogoutBtn");
        this.info = document.querySelector("#dummyUserInfo");

        if (!this.container) return;

        this.loginBtn.addEventListener("click", () => this.login());
        this.logoutBtn.addEventListener("click", () => this.logout());

        store.subscribe("isLoggedIn", (data) => {
            this.updateUI(data);
        });

        this.updateUI(store.getState().isLoggedIn);
    }

    async login() {
        
        const userId = this.input.value.trim();

        if (!userId) {
            console.log("No user ID entered");
            return;
        }

        // Pubba att någon försöker logga in (triggar storeService)
        PubSub.publish(EVENTS.STATE.LOGIN.START, { userId });
        
        store.setState({
            isLoggedIn: { id: userId }
        });
    
        // Pubba att någon vill logga in och status har uppdaterats
        PubSub.publish(EVENTS.STORE.UPDATED.ISLOGGEDIN);
        
    }

    logout() {
        
        // Pubba att någon vill logga ut (storeService)
        PubSub.publish(EVENTS.STATE.LOGOUT.START);
        
    }

    updateUI(isLoggedIn) {

        if (isLoggedIn && isLoggedIn.id) {
            
            this.container.style.backgroundColor = "#d0ffd0";
            this.info.textContent = `Logged in as: ${isLoggedIn.username || "(loading...)"}`;
           
            
        } else {
            
            this.container.style.backgroundColor = "#ffd0d0";
            this.info.textContent = "Not logged in";
            
        }
    }
}

export const DummyLogin = new dummyLogin();