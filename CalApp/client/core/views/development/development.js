import { store } from "../../store/store.js";

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

        store.setState({
            isLoggedIn: { id: userId }
        });

        await store.loadState(userId);
        
        console.log("------ DEVELOPMENT PRODUCTION LOGS -------")
        console.log(store.getState())
        console.log("------ DEVELOPMENT PRODUCTION LOGS -------")
    }

    logout() {
        store.resetState();
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