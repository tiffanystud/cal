
import { apiRequest } from "./api";
import { Pubsub } from "../store/pubsub";
import { Store } from "../store/store";

Pubsub.subscribe("request:sent:calendars:post", ()=>{
    // console.log
})