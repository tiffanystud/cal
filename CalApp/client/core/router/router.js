import { store } from "../store/store.js";

// Andra förslag på lösning av router? 

function resolveRoute(path) {
    const cleanPath = path.split("?")[0];

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
    view = path[1];
    store.setState({ currentPage: view });


    /*     switch (cleanPath) {
            case "/":
                store.setState({ currentPage: "home" });
                break;
    
            case "/calendar":
                store.setState({ currentPage: "calendar" });
                break;
    
            default:
                store.setState({ currentPage: "notfound" });
                break;
        } */


}

export const Router = {

    navigate(path) {
        history.pushState({}, "", path);
        resolveRoute(path);
    },

    init() {
        resolveRoute(window.location.pathname);

        window.addEventListener("popstate", () => {
            resolveRoute(window.location.pathname);
        });
    }
};






// ROUTER FÖRSLAG
// ROUTERN PUBLICERAR ETT EVENT, MED URL OCH VYN SUBSCRIBAR PÅ URL ELLER PARAMS OCH RENDERAR
import { PubSub } from "../store/pubsub.js";

export class TestRouter {
    constructor(url) {
        this.url = url.split("/").filter(Boolean);
        this.mainPath = this.url[0];
        this.subPath = this.url[1];

        PubSub.publish("change:view", {
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