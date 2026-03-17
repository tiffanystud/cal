import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { CreateNotificationsView } from "../views/notifications/notifications.js";

// ROUTERN PUBLICERAR ETT EVENT, MED URL OCH VYN SUBSCRIBAR PÅ EVENTET SOM SEDAN GER URL ELLER PARAMS OCH RENDERAR
export class Router {
    constructor(url) {
        this.url = new URL(url); // sträng
        this.urlPaths = this.url.pathname.split("/").filter(Boolean);
        this.mainPath = this.urlPaths[0];
        this.subPath = this.urlPaths[1];
        PubSub.publish("change:view", {
            url: this.url, //sträng
            mainPath: this.mainPath,
            subPath: this.subPath
        });




    }

    navigate(path) {
        console.log("Navigate func")
        history.pushState({}, "", path);
        new Router(path);
    }

    init() {
        console.log("Init func")
        window.addEventListener("popstate", () => {
            new Router(window.location.pathname);
        });
    }


}
