import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { Store } from "../store/store.js";
import { EVENTS } from "../store/events.js";

console.log("UserGroups service loaded");

export function userGroupsService() {

    PubSub.subscribe(EVENTS.REQUEST.SENT.USERGROUPS.POST, async payload => {

        try {
            
            const response = await apiRequest({
                entity: "usergroups",
                method: "POST",
                body: payload
            });

            PubSub.publish(EVENTS.RESPONSE.RECEIVED.USERGROUPS.POST, response);

            // Uppdatera store om OK
            const curr = Store.getState().data.usergroups || [];
            const updatedUG = [...curr, response];

            Store.setState({
                data: {
                    ...Store.getState().data,
                    usergroups: updatedUG
                }
            });

        } catch (err) {
            
            console.error("USERGROUPS POST ERROR:", err);
            PubSub.publish(EVENTS.RESPONSE.ERROR.USERGROUPS.POST, err);
            
        }
    });
}
