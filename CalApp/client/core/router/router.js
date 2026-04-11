import { EVENTS } from "../store/Events.js"
import { PubSub } from "../store/Pubsub.js";

// ROUTERN PUBLICERAR ETT EVENT, MED URL OCH VYN SUBSCRIBAR PÅ EVENTET SOM SEDAN GER URL ELLER PARAMS OCH RENDERAR
// 1. Läsa av aktuell URL 2. Dela upp den i mainPath/subPath 3. Skicka ut ett event (PubSub) så att vyer kan rendera rätt innehåll

export class router {

    handleUrl(url) {
        // Tar emot url och splittar till delar
        this.url = new URL(url, window.location.origin);
        // "/home/profile" -> ["home", "profile"]
        this.urlPaths = this.url.pathname.split("/").filter(Boolean);
        this.mainPath = this.urlPaths[0];
        this.subPath = this.urlPaths[1];

        this.updateUrl(url);
    }

    updateUrl(path) {
        // Tar emot url som ska uppdateras och pubar ett event för vyn

        history.pushState({}, "", path);

        PubSub.publish(EVENTS.VIEW.PAGE.SHOW.ANY, {
            entireUrl: this.url,
            mainPath: this.mainPath,
            subPath: this.subPath
        }, true);

    }

    init() {
        // Take current path in search field and popstates
        window.addEventListener("popstate", () => {
            this.handleUrl(window.location.pathname);
        });

    }


}

export const Router = new Router();