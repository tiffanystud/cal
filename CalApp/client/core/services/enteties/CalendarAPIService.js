import { store } from "../../store/Store.js";
import { apiRequest } from "../ApiService";
import { PubSub } from "../../store/Pubsub.js";
import { EVENTS } from "../../store/Events.js";


// "Service + Controller"
// Always listening? ***

class calendarAPIService {

    constructor() {
        this.subs();
    }

    subs() {

        this.unsubGET = PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.GET, (data) => {
            this.GET(data);
        })
        this.unsubPOST = PubSub.subscribe(REQUEST.SENT.EVENTS.POST, (data) => {
            this.POST(data);
        })
        this.unsubPATCH = PubSub.subscribe(REQUEST.SENT.EVENTS.PATCH, (data) => {
            this.PATCH(data);
        })
        this.unsubDELETE = PubSub.subscribe(REQUEST.SENT.EVENTS.DELETE, (data) => {
            this.DELETE(data);
        })
    }

    unsubs() {
        // Always active?? 
        if (this.unsubGET) unsubGET();
        if (this.unsubPOST) unsubPOST();
        if (this.unsubPATCH) unsubPATCH();
        if (this.unsubDELETE) unsubDELETE();
    }

    sendErrorMSG() {
        return { "Error": "Message" }
    }

    // METHODS
    GET(id = null) {

        const userCalendars = store.getState().cals;

        // Return one calendar
        if (id) {

            // If in state, return calendar from state
            const cal = userCalendars.find(c => c.id === id);
            if (cal) return cal;

            else {
                try {

                    const allCals = apiRequest({
                        "entity": "calendars",
                        "method": "GET"
                    })

                    // PUB OK
                    PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET);

                    const calendar = allCals.find(c => c.id === id);
                    return calendar;

                } catch (err) {
                    // PUB !OK
                    PubSub.publish(EVENTS.RESOURCE.ERROR.CALENDARS.GET);
                    return err;
                }
            }
        }

        // Return all calendars
        try {

            const allCals = apiRequest({
                "entity": "calendars",
                "method": "GET"
            })

            // PUB OK
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET);

            const calendar = allCals.find(c => c.id === id);
            return calendar;

        } catch (err) {
            // PUB !OK
            PubSub.publish(EVENTS.RESOURCE.ERROR.CALENDARS.GET);
            return err;
        }

    }

    
}

export const CalendarAPIService = new calendarAPIService()