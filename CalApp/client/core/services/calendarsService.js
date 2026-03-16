
import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { Store } from "../store/store.js";
import { EVENTS } from "../store/events.js";

console.log("Calendar service loaded");

export function initCalendarService() {

    // EVENT GET FOR CALENDARS
    PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.GET, async function (payload) {

        console.log("EVENT RECEIVED", payload);

        try {

            // Skicka request data och payload till api.js
            const response = await apiRequest("/calendars");

            // Publish att response och resource är recieved 
            PubSub.publish(EVENTS.RESPONSE.RECEIVED.CALENDARS.GET, response)
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET, response)

            // Se över store objektet
            const currCals = Store.getState().data.cals;
            const newCals = [...currCals, ...response];

            // Uppdatera state
            Store.setState({
                data: {
                    ...Store.getState().data,
                    cals: newCals
                }
            });


        } catch {
            
            console.error("CALENDARS GET ERROR:", err);
            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.GET, err);
            
        }

    })

    // POST /calendars
    PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.POST, async function (payload) {

        const calendarPayload = payload.calendarPayload;
        const membershipPayload = payload.membershipPayload;

        const admins = membershipPayload.admins;
        const members = membershipPayload.members;

        try {
            const response = await apiRequest({
                entity: "calendars",
                method: "POST",
                body: calendarPayload
            });

            // If ok (trigga // POST /calendars (received)
            PubSub.publish(EVENTS.RESPONSE.RECEIVED.CALENDARS.POST, {
                calendar: response,
                admins: admins,
                members: members
            });
            
            // Response (om ngn bara vull lysssna på d)
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.POST, response);

            const curr = Store.getState().data.cals;
            const updatedCals = [...curr, response];

            // Uppdatera cals
            Store.setState({
                data: {
                    ...Store.getState().data,
                    cals: updatedCals
                }
            });

        } catch (err) {
            
            console.error("CALENDARS POST ERROR:", err);
            PubSub.publish(EVENTS.RESPONSE.ERROR.CALENDARS.POST, err);
            
        }
    });

    
    // POST /calendars (received)
    PubSub.subscribe(EVENTS.RESPONSE.RECEIVED.CALENDARS.POST, function (pubsubData) {

        // Create memberships in group
        
        const calendar = pubsubData.calendar;
        const admins = pubsubData.admins;
        const members = pubsubData.members;

        const calendarId = calendar.id;

        // Trigga userGroups (admins)
        for (const currAdmin of admins) {
            
            PubSub.publish(EVENTS.REQUEST.SENT.USERGROUPS.POST, {
                calendarId: calendarId,
                userId: currAdmin.id,
                isAdmin: true
            });
        }

        // Trigga userGroups (members)
        for (const currMember of members) {

            PubSub.publish(EVENTS.REQUEST.SENT.USERGROUPS.POST, {
                calendarId: calendarId,
                userId: currMember.id,
                isAdmin: false
            });
        }
    });

}
