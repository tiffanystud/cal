
import { apiRequest } from "./api";
import { Pubsub } from "../store/pubsub";
import { Store } from "../store/store";

Pubsub.subscribe("request:sent:calendars:post", async function (payload) {
    
    try {
        
        // Skicka request data och payload till api.js
        const response = await apiRequest({
            entity: "calendars",
            method: "POST",
            body: payload
        });

        // Publish att response och resource är recieved 
        Pubsub.publish("response:recieved:calendars:post", response)
        Pubsub.publish("resource:recieved:calendars:post", response)
        
        const currState = Store.getState().data.cals;
        
    } catch {
        
        // console.log
        
    }

})