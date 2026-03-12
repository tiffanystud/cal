import { store } from "../store/store.js";

// Andra förslag på lösning av router? 

function resolveRoute(path) {
    const cleanPath = path.split("?")[0];

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

    switch (cleanPath) {
        case "/":
            store.setState({ currentPage: "home" });
            break;

        case "/calendar":
            store.setState({ currentPage: "calendar" });
            break;

        default:
            store.setState({ currentPage: "notfound" });
            break;
    }

    store.notify("pageChanged");
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

