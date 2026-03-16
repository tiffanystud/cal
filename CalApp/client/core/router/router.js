import { store } from "../store/store.js";
import { pubSub } from "../store/pubsub.js";
import { renderApp } from "../views/renderApp.js"
import { loginSimulation } from "../../loginTest.js";

// Andra förslag på lösning av router? 

function resolveRoute(path) {
    const cleanPath = path.split("?")[0];
    const pathSplit = path.split("/");
    let view; 
    // Dynamisk route: /events/event/3 -> kom på bättre lösning
    if (cleanPath.startsWith("/events/event/")) {
        const id = cleanPath.split("/").pop();
        store.setState({
            currentPage: "eventDetails",
            params: { id }
        });
        store.notify("pageChanged");
        return;
    }
    // Gör lösning ovan så detta fungerar
    view = pathSplit[3];
    if (!view){
        view = "home";
    }
    let isLoggedIn = store.isLoggedIn;
    if (!isLoggedIn){
        let newState = loginSimulation();
    }
    renderApp(view);
    
}

export const Router = {
    
    navigate(path) {
        history.pushState({}, "", path);
        resolveRoute(path);
    },

    init() {
        
        console.log(window.location.pathname);
        resolveRoute(window.location.pathname);
        
        

        window.addEventListener("popstate", () => {
            resolveRoute(window.location.pathname);
            console.log("eventListener")
        });
    }
};

export class TestRouter {
    constructor(url) {
        this.url = url.split("/").filter(Boolean);
        this.mainPath = this.url[0];
        this.subPath = this.url[1];

        pubSub.publish("change:view", {
            url: this.url,
            mainPath: this.mainPath,
            subPath: this.subPath,
        })
        console.log("router fired", this.mainPath, this.subPath);

    }

    navigate(path) {
        history.pushState({}, "", path);
        new TestRouter(path);
    }

    init() {
        window.addEventListener("popstate", () => {
            new TestRouter(window.location.pathname);
        });
    }


}