import { PubSub } from "../store/pubsub.js";

// ROUTER FÖRSLAG
// ROUTERN PUBLICERAR ETT EVENT, MED URL OCH VYN SUBSCRIBAR PÅ EVENTET SOM SEDAN GER URL ELLER PARAMS OCH RENDERAR
export class TestRouter {
    constructor(url) {
        this.url = url.split("/").filter(Boolean);
        this.mainPath = this.url[0];
        this.subPath = this.url[1];

        // Change:view är eventet som alla vyer lyssnar på via subscribe, om url matchar när vyn subscribar, så renderar den
        PubSub.publish("change:view", {
            url: this.url,
            mainPath: this.mainPath,
            subPath: this.subPath,
        })

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
