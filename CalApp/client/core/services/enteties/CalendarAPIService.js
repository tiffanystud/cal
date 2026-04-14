import { store } from "../../store/Store.js";
import { apiRequest } from "../ApiService";
import { PubSub } from "../../store/Pubsub.js";
import { EVENTS } from "../../store/Events.js";


// Service + Controller
// Always listening? ***

class calendarAPIService {

    constructor() {
        this.subs();
    }

    subs() {

        this.unsubGET = PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.GET, (data) => {
            this.GET(data);
        })
        this.unsubPOST = PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.POST, (data) => {
            this.POST(data);
        })
        this.unsubPATCH = PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.PATCH, (data) => {
            this.PATCH(data);
        })
        this.unsubDELETE = PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.DELETE, (data) => {
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

    pubRequestError(ENTITY, METHOD) {
        return PubSub.publish(EVENTS.REQUEST.ERROR[ENTITY][METHOD]);
    }
    
    pubResourceReceived(ENTITY, METHOD) {
        return PubSub.publish(EVENTS.RESOURCE.RECEIVED[ENTITY][METHOD]);
    }
    
    pubResourceError(ENTITY, METHOD) {
        return PubSub.publish(EVENTS.RESOURCE.ERROR[ENTITY][METHOD]);
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
            pubRequestError("GET")
            return err;
        }

    }

    POST(newCalendar) {

        if (!newCalendar) return pubRequestError("POST");

        // All attributes
        if (!newCalendar.creatorId) return pubRequestError("POST");
        if (!newCalendar.calendarName) return pubRequestError("POST");
        if (!newCalendar.description) newCalendar.description = "";
        if (!newCalendar.type) newCalendar.creatorId = "public";

        try {

            const created = apiRequest({
                "entity": "calendars",
                "method": "POST",
                "body": newCalendar
            })

            // PUB OK
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.POST);
            return created;

        } catch (err) {
            // PUB !OK
            pubRequestError("POST")
            return err;
        }

    }

    PATCH(newData) {

        if (!newData) return pubRequestError("PATCH");

        // All attributes
        if (
            !newCalendar.calendarName == null &&
            !newCalendar.description == null &&
            !newCalendar.type == null
        ) return pubRequestError("PATCH");


        try {

            const patched = apiRequest({
                "entity": "calendars",
                "method": "PATCH",
                "body": newData
            })

            // PUB OK
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.PATCH);
            return patched;

        } catch (err) {
            // PUB !OK
            pubRequestError("PATCH")
            return err;
        }

    }

    DELETE(id) {

        if (!id) return pubRequestError("DELETE");

        // Constraints
        const foundCalendar = store.getState().cals.find(c => c.id === id);
        const userID = store.getState().isLoggedin.id;
        if (foundCalendar.creatorId !== userID) return pubRequestError("DELETE");

        try {

            const patched = apiRequest({
                "entity": "calendars",
                "method": "DELETE",
                "body": id
            })

            // PUB OK
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.DELETE);
            return patched;

        } catch (err) {
            // PUB !OK
            pubRequestError("DELETE")
            return err;
        }

    }

}

export const CalendarAPIService = new calendarAPIService()