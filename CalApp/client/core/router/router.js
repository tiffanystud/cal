import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { CreateNotificationsView } from "../views/notifications/notifications.js";

// Andra förslag på lösning av router? 

function resolveRoute(path) {
    console.log("resolveRoute runs");
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

    
    switch (cleanPath) {
        case "/":
            store.setState({ currentPage: "home" });
            break;

        case "/calendar":
            store.setState({ currentPage: "calendar" });
            break;

        case "/notifications":
            let notiView = new CreateNotificationsView(document.querySelector("#app"));
            PubSub.publish("pageChanged", "notifications");
            break;

        default:
            store.setState({ currentPage: "notfound" });
            break;
    } 


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

