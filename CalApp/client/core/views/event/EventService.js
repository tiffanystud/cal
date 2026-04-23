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
            if (param) {
                // Detta är gammalt, det ska uppdateras i storeservice när den pubas härifrån.
                // PubSub.publish(EVENTS.REQUEST.SENT.EVENTS.GET);
                // PubSub.publish(EVENTS.REQUEST.SENT.USERCALENDARS.GET);
                // PubSub.publish(EVENTS.REQUEST.SENT.CALENDAR.GET);

                this.participantsService(param);

            }
        })

        // Osäker om det istället ska vara ett annat event istället för show, detta event borde finnas i viewn istället
        // MÅSTE GÖRAS OM
        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.EVENT, (data) => {
            let state = store.getState();
            PubSub.publish(EVENTS.REQUEST.SENT.EVENTS.GET);
            let eventObject = state.events.find(event => event == data.id);
            if (!eventObject) {
                PubSub.publish(EVENTS.RESOURCE.ERROR.EVENTS.GET)
            } else {
                this.participantsLogic(eventObject["id"]);
            }

        })

    }



    participantsService(eventId) {
        // Pubba data.selected för att hämta in data från store
        let eventObject = PubSub.publish(EVENTS.DATA.SELECTED.EVENTS, [eventId]);

        let userCalendars = PubSub.publish(EVENTS.DATA.SELECTED.USERCALENDARS, [eventObject[calId]]);
        let userCalendarsIds = userCalendars.map(userCal => userCal.userId);

        let eventsRSVP = PubSub.publish(EVENTS.DATA.SELECTED.EVENTSRSVP, userCalendarsIds);

        let userIsGoing = eventsRSVP.filter(eventsRSVPKeys => eventsRSVPKeys.isGoing == "yes");
        let userNotGoing = eventsRSVP.filter(eventsRSVPKeys => eventsRSVPKeys.igGoing == "no");
        let userMaybebGoing = eventsRSVP.filter(eventsRSVPKeys => eventsRSVPKeys.isGoing == "maybe");

        PubSub.publish(EVENTS.DATA.RETURNED.EVENTSRSVP, {
            isGoing: userIsGoing,
            isNotGoing: userNotGoing,
            userMaybeGoing: userMaybebGoing
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