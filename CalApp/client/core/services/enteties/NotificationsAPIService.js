import { store } from "../../store/Store.js";
import { apiRequest } from "../ApiService";
import { PubSub } from "../../store/Pubsub.js";
import { EVENTS } from "../../store/Events.js";

// Service + Controller
// Always listening? ***

class NotificationsAPIService {

    constructor() {
        this.subs();
    }

    subs() {

        this.unsubGET = PubSub.subscribe(EVENTS.REQUEST.SENT.NOTIFICATIONS.GET, (data) => {
            this.GET(data);
        })
        this.unsubPOST = PubSub.subscribe(EVENTS.REQUEST.SENT.NOTIFICATIONS.POST, (data) => {
            this.POST(data);
        })
        this.unsubPATCH = PubSub.subscribe(EVENTS.REQUEST.SENT.NOTIFICATIONS.PATCH, (data) => {
            this.PATCH(data);
        })
        this.unsubDELETE = PubSub.subscribe(EVENTS.REQUEST.SENT.NOTIFICATIONS.DELETE, (data) => {
            this.DELETE(data);
        })

    }

    unsubs() {
        // Always active?? 
        if (this.unsubGET) this.unsubGET();
        if (this.unsubPOST) this.unsubPOST();
        if (this.unsubPATCH) this.unsubPATCH();
        if (this.unsubDELETE) this.unsubDELETE();
    }

    sendErrorMSG() {
        return { error: "Something went wrong." };
    }

    // METHODS
    GET(id = null) {

        // Byt till store
        const userCalendars = store.getState().cals;

        // Return one calendar
        if (id) {

            // If in state, return calendar from state
            const cal = userCalendars.find(c => c.id === id);
            if (cal) {
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET);
                return cal;
            }

            try {

                const allCals = apiRequest({
                    "entity": "calendars",
                    "method": "GET"
                });

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

        // Return all calendars
        try {

            const allCals = apiRequest({
                "entity": "calendars",
                "method": "GET"
            })

            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET);

            return allCals;

        } catch (err) {
            PubSub.publish(EVENTS.RESOURCE.ERROR.CALENDARS.GET);
            return err;
        }

    }

    POST(newCalendar) {

        if (!newCalendar) {
            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.POST);
            return this.sendErrorMSG();
        }

        // Constraints
        if (!newCalendar.creatorId) {
            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.POST);
            return this.sendErrorMSG();
        }
        if (!newCalendar.calendarName) {
            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.POST);
            return this.sendErrorMSG();
        }
        if (!newCalendar.description) newCalendar.description = "";
        if (!newCalendar.type) newCalendar.type = "public";

        try {

            const created = apiRequest({
                "entity": "calendars",
                "method": "POST",
                "body": newCalendar
            })

            // PUB OK
            PubSub.publish(EVENTS.RESPONSE.RECEIVED.CALENDARS.POST);
            return created;

        } catch (err) {
            // PUB !OK
            PubSub.publish(EVENTS.RESPONSE.ERROR.CALENDARS.POST);
            return err;
        }

    }

    PATCH(newData) {

        if (!newData) {
            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.PATCH);
            return this.sendErrorMSG()
        }

        if (
            newData.calendarName == null &&
            newData.description == null &&
            newData.type == null
        ) {
            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.PATCH);
            return this.sendErrorMSG();
        }

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
            PubSub.publish(EVENTS.RESOURCE.ERROR.CALENDARS.PATCH);
            return err;
        }

    }

    DELETE(id) {

        if (!id) {
            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.DELETE);
            return this.sendErrorMSG();
        }

        const foundCalendar = store.getState().cals.find(c => c.id === id);
        const userID = store.getState().isLoggedin.id;

        if (!foundCalendar || foundCalendar.creatorId !== userID) {
            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.DELETE);
            return this.sendErrorMSG();
        }

        try {

            const result = apiRequest({
                "entity": "calendars",
                "method": "DELETE",
                "body": id
            })

            // PUB OK
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.DELETE);
            return result;

        } catch (err) {
            PubSub.publish(EVENTS.RESOURCE.ERROR.CALENDARS.DELETE);
            return err;
        }

    }

}