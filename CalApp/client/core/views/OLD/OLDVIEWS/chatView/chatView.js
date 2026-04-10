import { store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";
import { PubSub } from "../../store/pubsub.js";
import "./components/MessageFeedPreview/MessageFeedPreview.js";

export class ChatView extends HTMLElement {

    constructor() {
        super();
        this.state;
        this.attachShadow({ mode: "open" });

        PubSub.subscribe("change:page", (data) => {
            if (data.page === "chat") {
                this.render();
            }
        });

        PubSub.subscribe("change:view", (data) => {
            if (data.mainPath === "home" && data.subPath === "chat") {
                this.render();
            }
        });

        PubSub.subscribe(EVENTS.DATA.RETURNED.MESSAGES, (data) => {
            this.renderChat(data);
        });
    }


    render() {

        const content = document.querySelector("#content");
        const state = store.getState();

        content.innerHTML = `
            <style>
                #searchResults {
                    margin-top: 10px;
                }
                #chatWindow {
                    margin-top: 20px;
                }
            </style>

            <h2>Messages</h2>

            <app-input id="searchBar" placeholder="Type calendar or a friend to chat"></app-input>

            <div id="searchResults"></div>
            
            <div id="chatWindow"></div>

            <message-feed-preview></message-feed-preview>
        `;

        const searchBar = content.querySelector("#searchBar");
        const searchResults = content.querySelector("#searchResults");

        const allCals = state.cals;
        const allFriends = state.friends;

        let allDataWithType = [];

        // Calendars
        for (let cal of allCals) {
            if (cal.name) {
                allDataWithType.push({
                    name: cal.name,
                    type: "calendar",
                    id: cal.id
                });
            }
        }

        // Friends
        for (let friend of allFriends) {
            if (friend.name) {
                allDataWithType.push({
                    name: friend.name,
                    id: friend.id,
                    type: "friend"
                });
            }
        }

        // Search field
        searchBar.addEventListener("input", () => {

            searchResults.innerHTML = "";

            const valueInput = searchBar.getValue().toLowerCase();

            if (valueInput.length > 0) {

                for (let data of allDataWithType) {

                    if (data.name.toLowerCase().includes(valueInput)) {

                        const divContainer = document.createElement("div");
                        divContainer.style.background = "white";
                        divContainer.style.padding = "5px";
                        divContainer.style.borderBottom = "1px solid black";

                        const div = document.createElement("div");
                        div.style.display = "flex";
                        div.style.justifyContent = "space-between";

                        const pName = document.createElement("p");
                        pName.textContent = data.name[0].toUpperCase() + data.name.slice(1).toLowerCase();

                        const pType = document.createElement("p");
                        pType.textContent = data.type[0].toUpperCase() + data.type.slice(1).toLowerCase();

                        div.appendChild(pName);
                        div.appendChild(pType);
                        divContainer.appendChild(div);

                        // When clicking a search result
                        divContainer.addEventListener("click", () => {
                            PubSub.publish(EVENTS.DATA.SELECTED.MESSAGES, {
                                chatType: data.type,
                                chatId: data.id
                            });
                        });

                        searchResults.appendChild(divContainer);
                    }
                }
            }
        });
    }


    // Render message-boxes
    renderChat(data) {

        const chatWindow = document.querySelector("#chatWindow");
        chatWindow.innerHTML = "";

        const userId = store.getState().isLoggedIn.id;

        let messages = [];

        // Private chat
        if (data.chatType === "friend") {
            messages = data.privateMSG.filter(m =>
                (m.senderId === userId && m.receiverId === data.chatId) ||
                (m.receiverId === userId && m.senderId === data.chatId)
            );
        }

        // Calendar chat
        if (data.chatType === "calendar") {
            messages = data.calendarMSG.filter(m => m.calId === data.chatId);
        }

        // Get user objects
        const senderObj = data.users.find(u => u.id === userId);
        const receiverObj = data.users.find(u => u.id === data.chatId);

        // Render each message
        for (let msg of messages) {

            const box = document.createElement("message-box");

            box.message = msg;
            box.users = {
                sender: senderObj,
                receiver: receiverObj
            };

            if (msg.senderId === userId) {
                box.alignRight = true;
                box.bg = "#d0f0ff";
            }

            chatWindow.appendChild(box);
        }
    }
}

customElements.define("chat-view", ChatView);
new ChatView();
