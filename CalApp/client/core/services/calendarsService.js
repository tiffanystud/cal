
import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { EVENTS } from "../store/events.js";


export function CalendarService() {

    // EVENT GET FOR CALENDARS
    PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.GET, async function () {

        try {

            const calRequest = {
                entity: "/calendars",
                method: "GET",
            }

            const resource = await apiRequest(calRequest);

            // Publish att response och resource är recieved 
            PubSub.publish(EVENTS.RESPONSE.RECEIVED.CALENDARS.GET, resource)
            PubSub.publish(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET, resource)

            const currCals = store.getState().userData.cals;
            const newCals = [...currCals, ...resource];

            // Uppdatera state
            store.setState({
                userData: {
                    ...store.getState().userData,
                    cals: newCals
                }
            });


        } catch {

            PubSub.publish(EVENTS.REQUEST.ERROR.CALENDARS.GET, err);

        }

    })

    // POST /calendars
    PubSub.subscribe(EVENTS.REQUEST.SENT.CALENDARS.POST, async function (payload) {

        const calendarPayload = payload.calendarPayload;
        const membershipPayload = payload.membershipPayload;
        const admins = membershipPayload.admins;
        const members = membershipPayload.members;

        let hasNonCreatorUser = false;

        try {

            const resource = await apiRequest({
                entity: "calendars",
                method: "POST",
                body: calendarPayload
            });

            const calendarId = resource.id;
            const creatorId = resource.creatorId;
            let creatorIsAdmin = false;

            for (const a of admins) {
                if (a.id === creatorId) {
                    creatorIsAdmin = true;
                    break;
                }
            }

            if (!creatorIsAdmin) {
                admins.push({
                    id: creatorId,
                    name: "Creator"
                });
            }

            // START OF ROLLBACK (needs to add at least one member)

            // Check if any admins has been added
            for (const a of admins) {
                if (a.id !== creatorId) {
                    hasNonCreatorUser = true;
                    break;
                }
            }

            // Check if member has been added
            if (!hasNonCreatorUser) {
                for (const m of members) {
                    if (m.id !== creatorId) {
                        hasNonCreatorUser = true;
                        break;
                    }
                }
            }

            // If no other users added, abort create calendar
            if (!hasNonCreatorUser) {

                await apiRequest({
                    entity: `calendars`,
                    method: "DELETE",
                    body: {
                        id: calendarId,
                        creatorId: creatorId
                    }
                });

                return;
            }

            // END OF ROLLBACK 


            // If ok (trigger / POST /calendars (received)
            PubSub.publish(EVENTS.RESPONSE.RECEIVED.CALENDARS.POST, {
                calendar: resource,
                admins: admins,
                members: members
            });

            const curr = store.getState().userData.cals;
            const updatedCals = [...curr, resource];

            // Uppdatera cals
            store.setState({
                userData: {
                    ...store.getState().userData,
                    cals: updatedCals
                }
            });

            // PUBLISH LISTENER (GO TO NEXT PAGE)
            PubSub.publish("change:page", {
                page: "myCal"
            })

        } catch (err) {

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