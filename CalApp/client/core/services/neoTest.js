import { PubSub } from "../store/pubsub.js";
import { EVENTS } from "../store/events.js";
import { store } from "../store/store.js";
import { MessagesInput } from "../../components/messagesInput/messagesInput.js";
import { MessageBox } from "../../components/messageBox/messageBox.js";

PubSub.subscribe("change:view", (data) => {
    if (data.mainPath === "msgTest") {
        document.querySelector("#content").innerHTML = "<messages-input></messages-input>";
        PubSub.subscribe(EVENTS.STATE.LOGIN.SUCCESS, () => {
            let currentStore = store.getState();
            let userPrivMsgs = currentStore.privateMessages.filter((x) => x.senderId === currentStore.isLoggedIn.id || x.receiverId === currentStore.isLoggedIn.id);
            userPrivMsgs.forEach((x) => {
                let msgBox = document.createElement("message-box");
                msgBox.message = x;
                document.querySelector("#app").appendChild(msgBox);
            })
        }) 
    }
});

console.log("neoTest service runs");