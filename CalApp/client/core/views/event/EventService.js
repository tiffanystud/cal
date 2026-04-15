import { EVENTS } from "../../store/Events.js";
import { PubSub } from "../../store/Pubsub.js";
import { Router } from "../../router/router.js";
import { store } from "../../store/Store.js";



class EventService {

    constructor() {

    }

    subs() {
        // Här sker tvp subs, beroende på om man trycker på ett event på sidan, eller navigerar till ett event via sökvägen med en url

        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.ANY, (data) => {
            let param = data.entireUrl.searchParams.get("id");
            let state = store.getState();
            if (param) {
                PubSub.publish(REQUEST.SENT.EVENTS.GET);
                PubSub.publish(REQUEST.SENT.USERCALENDARS.GET);
                PubSub.publish(REQUEST.SENT.CALENDAR.GET);
                let eventObject = state.events.find(event => event.id == param);
                state.setState(eventObject);
                if (!eventObject) {
                    PubSub.publish(RESOURCE.ERROR.EVENTS.GET)
                } else {
                    // Puba ett event som view lyssnar på för att synas 
                }
            }
        })

        // Osäker om det istället ska vara ett annat event istället för show, detta event borde finnas i viewn istället
        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.EVENT, (data) => {
            let state = store.getState();
            PubSub.publish(REQUEST.SENT.EVENTS.GET);
            let eventObject = state.events.find(event => event == data.id);
            if (!eventObject) {
                PubSub.publish(RESOURCE.ERROR.EVENTS.GET)
            } else {
                // Puba ett event som view lyssnar på för att synas 
            }

        })

    }



    participantsLogic(eventData) {
        let state = store.getState();
        let eventsParticipants = state.events_rsvp.filter(rsvp => rsvp.eventId == eventData.id);


        PubSub.publish()


    }

    eListeners() {

    }

    setURL(newURL) {
        // Sätt url till view
        Router.updateUrl(newURL);

    }



}

new EventService();