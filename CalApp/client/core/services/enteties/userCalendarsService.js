
import { apiRequest } from "../api.js";
import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";


// NOT UPDATED !
export function userCalendarService() {

    // Just for rollback functionality
    const newCalendar = []

    // POST /user_calendars
    PubSub.subscribe(EVENTS.REQUEST.SENT.USERGROUPS.POST, async function (payload) {

        try {


            const response = await apiRequest({
                entity: "users_calendars",
                method: "POST",
                body: payload
            });


            PubSub.publish(EVENTS.RESPONSE.RECEIVED.USERGROUPS.POST, response);

            // Uppdatera store om OK
            newCalendar.push({
                /*             payload.calId, 
                            payload.userId */
            })

            const curr = store.getState().userData.usergroups || [];
            const updatedUG = [...curr, response];

            store.setState({
                userData: {
                    ...store.getState().userData,
                    usergroups: updatedUG
                }
            });

        } catch (err) {

            console.error("USERGROUPS POST ERROR:", err);
            PubSub.publish(EVENTS.REQUEST.ERROR.USERGROUPS.POST, err);

        }
    });
}

userGroupsService();