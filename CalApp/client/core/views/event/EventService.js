import { EVENTS } from "../../store/events.js";
import { PubSub } from "../../store/pubsub.js";
import { Router } from "../../router/router.js";
import { store } from "../../store/store.js";



class EventService {

    constructor() {

    }

    subs() {

        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.ANY, (data) => {
            let param = data.entireUrl.searchParams.get("id");
            if (param) {

            }
        })

        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.EVENT, (data) => {
            let foundStateEvent = store.getState().find(event => event.id == data.id);
            if (!foundStateEvent) {
                // Fetch api för att hämta uppdatera state och kolla igen
            } else {
                // Köra ett Pubsub för eventet att poppa upp i EventView som den lyssnar på
            }
        })

    }

    eListeners() {

    }

    setURL(newURL) {
        // Sätt url till view
        Router.updateUrl(newURL);

    }



}

new EventService();