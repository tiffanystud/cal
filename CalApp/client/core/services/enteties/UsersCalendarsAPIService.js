import { Store } from "../../store/Store.js";
import { APIRequest } from "../APIService.js";
import { PubSub } from "../../store/Pubsub.js";
import { EVENTS } from "../../store/Events.js";


// NOT DONE
class userCalendarsAPIService {

    constructor() {
        this.subs();
    }

    subs() {

        this.unsubGET = PubSub.subscribe(EVENTS.REQUEST.SENT.USERSCALENDARS.GET, (data) => {
            this.GET(data);
            // console.log("HI I WAS CALLED? (from ugsAPI)", data)
        })
        this.unsubPOST = PubSub.subscribe(EVENTS.REQUEST.SENT.USERSCALENDARS.POST, (data) => {
            this.POST(data);
        })
        this.unsubPATCH = PubSub.subscribe(EVENTS.REQUEST.SENT.USERSCALENDARS.PATCH, (data) => {
            this.PATCH(data);
        })
        this.unsubDELETE = PubSub.subscribe(EVENTS.REQUEST.SENT.USERSCALENDARS.DELETE, (data) => {
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
    async GET(calID = null) {

        // Return all UGS
        try {

            const allUGs = await APIRequest({
                "entity": "users_calendars",
                "method": "GET"
            })

            // console.log("IM GIVING YOU THIS DATA NOW:", allUGs, "(from ugsAPI)");
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.USERSCALENDARS.GET, allUGs);

            return allUGs;

        } catch (err) {

            PubSub.publish(EVENTS.RESOURCE.ERROR.USERSCALENDARS.GET, (err));
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

            const created = APIRequest({
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

            const patched = APIRequest({
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

        const foundCalendar = Store.getState().cals.find(c => c.id === id);
        const userID = Store.getState().isLoggedin.id;

        if (!foundCalendar || foundCalendar.creatorId !== userID) {
            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.DELETE);
            return this.sendErrorMSG();
        }

        try {

            const result = APIRequest({
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

export const UserCalendarsAPIService = new userCalendarsAPIService()