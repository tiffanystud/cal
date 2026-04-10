import { PubSub } from "../../../store/pubsub.js";
import { EVENTS } from "../../../store/events.js";
import { store } from "../../../store/store.js";
import { apiRequest } from "../../../services/api.js";

PubSub.subscribe("change:view", (data) => {
    if (data.mainPath === "msgTest") {
        PubSub.subscribe(EVENTS.STATE.LOGIN.SUCCESS, async () => {
            let allUsers = await apiRequest({
                entity: "users",
                method: "GET"
            });
            store.getState().privateMessages.forEach((x) => {
                let sender = allUsers.find((y) => y.id === x.senderId);
                let receiver = allUsers.find((y) => y.id === x.receiverId);
                let msgBox = document.createElement("message-box");
                if (sender.id === store.getState().isLoggedIn.id) {
                    msgBox.alignRight = true;
                    msgBox.bg = "lightblue";
                }
                msgBox.message = x;
                msgBox.users = {
                    sender: sender,
                    receiver: receiver
                }
                document.querySelector("#app").appendChild(msgBox);
            })
            document.querySelector("#app").appendChild(document.createElement("messages-input"));
        }) 
    }
});