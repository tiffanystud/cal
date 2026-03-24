
import { PubSub } from "../store/pubsub.js";

// ROUTERN PUBLICERAR ETT EVENT, MED URL OCH VYN SUBSCRIBAR PÅ EVENTET SOM SEDAN GER URL ELLER PARAMS OCH RENDERAR
// 1. Läsa av aktuell URL 2. Dela upp den i mainPath/subPath 3. Skicka ut ett event (PubSub) så att vyer kan rendera rätt innehåll

export class Router {
    
    // Publicera event (vilken paage) som vyer lysssnar på
    constructor(url) {
        
        this.url = new URL(url, window.location.origin); // sträng
        console.log(url);
        // "/home/profile" -> ["home", "profile"]
        this.urlPaths = this.url.pathname.split("/").filter(Boolean);
        this.mainPath = this.urlPaths[0];
        this.subPath = this.urlPaths[1];
        // Payload innehåller info om vilken route som ska visas, change:view(payload)
        PubSub.publish("change:view", {
            
            url: this.url, //sträng <- NEJ!!! detta blir ett URL-objekt
            mainPath: this.mainPath,
            subPath: this.subPath
            
        });
        
        console.log("Router constructor, url:", url);
        
    }

    // Ändra URL i webbläsaren, kör constructor med path
    navigate(path) {
        
        console.log("Navigate func");

        // pushState ändrar URL i webbläsaren utan att ladda om sidan
        history.pushState({}, "", path);
        
        // Skapar en ny router-instans för att trigga rendering
        new Router(path);

    }
    
    // Läs in current path, kör navigate sen
    init() {
        
        console.log("Init func");
        
        // Take current path in search field and popstates
        window.addEventListener("popstate", () => {
            this.navigate(window.location.pathname);
        });
        
    }


}
