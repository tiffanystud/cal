
import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { EVENTS } from "../store/events.js";

console.log("Calendar service loaded");

export function CalendarService() {

    // EVENT GET FOR CALENDARS
    PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.GET, async function () {

        try {

            const calRequest = {
                entity: "/calendars",
                method: "GET",
            }

            const response = await apiRequest(calRequest);

            // Publish att response och resource är recieved 
            PubSub.publish(EVENTS.RESPONSE.RECEIVED.CALENDARS.GET, response)
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET, response)

            const currCals = store.getState().userData.cals;
            const newCals = [...currCals, ...response];

            // Uppdatera state
            store.setState({
                userData: {
                    ...store.getState().userData,
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
            
            const curr = store.getState().userData.cals;
            const updatedCals = [...curr, response];

            // Uppdatera cals
            store.setState({
                userData: {
                    ...store.getState().userData,
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
        

        // Trigga userGroups Service (admins)
        for (const currAdmin of admins) {
            
            PubSub.publish(EVENTS.REQUEST.SENT.USERGROUPS.POST, {
                calId: calendarId,
                userId: currAdmin.id,
                isAdmin: true
            });
        }
        
        // Trigga userGroups Service (members)
        for (const currMember of members) {
            
            let isAlreadyAdmin = false;

            // Om user redan är tiillagd som admin, ska ej user kunna vara member/!admin också
            for (const currAdmin of admins) {
                if (currAdmin.id === currMember.id) {
                    isAlreadyAdmin = true;
                    break;
                }
            }

            if (isAlreadyAdmin) {
                continue; // Om user finns som admin, hoppa över denna user
            }

            PubSub.publish(EVENTS.REQUEST.SENT.USERGROUPS.POST, {
                calId: calendarId,
                userId: currMember.id,
                isAdmin: false
            });
        }
    });

}

CalendarService();