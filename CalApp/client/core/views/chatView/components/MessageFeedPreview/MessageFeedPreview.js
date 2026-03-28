

import { EVENTS } from "../../../../store/events.js";
import { PubSub } from "../../../../store/pubsub.js";
import { store } from "../../../../store/store.js";

export class MessageFeedPreview extends HTMLElement {

    constructor() {

        super();
        this.subscriptions = [];

        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                
                .popupContainer {
                    height: 100%;
                }
                    
                .hidden {
                    display: none;
                }

                .chatFeedContainer {
                    padding: 0 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    height: 100%;
                    overflow: scroll;
                }

                .chatBox {
                    background-color: white;
                    display: flex;
                    flex-direction: column;
                    align-items: end;
                    border-radius: 8px;
                    padding: 10px;
                }

                .chatBox:hover {
                    background-color: whitesmoke;
                }

                .notificationCirkle {
                    width: 4px;
                    height: 4px;
                    background-color: red;
                    border-radius: 50%;
                    margin-top: -3px;
                    padding: 3px;
                }

                .groupImg {
                    border-radius: 50%;
                    background-color: cornflowerblue;
                    flex-basis: 0;
                    flex-grow: 1;
                }

                .chatBoxContent {
                    display: flex;
                    flex-direction: row;

                }

                .messageContainer {
                    display: flex;
                    flex-direction: row;
                    flex-basis: 0;
                    flex-grow: 5;
                    padding: 5px 0px 5px 5px;
                    align-items: center;
                }

                .messageTextContainer {
                    display: flex;
                    flex-direction: column;

                }

                .chatName {
                    margin: 0;
                }

                .messageContent {
                    display: flex;
                    flex-direction: row;
                    height: 28px;
                    overflow: hidden;
                }

                .textContent {
                    margin: 0;
                }
            </style>
            
            <div class="popupContainer">
                <h3>Your Chats</h3>
                <div class="chatFeedContainer"></div>
            </div>
        `;

    }

    subs() {

        // Subscribe popup show, save returned unsubscribe fn
        this.subscriptions.push(
            PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.MESSAGEFEEDPREVIEW, () => {
                this.openPopup();
            })
        );

        // Subscribe messages received, save returned unsubscribe fn
        this.subscriptions.push(
            PubSub.subscribe(EVENTS.RESPONSE.RECEIVED.MESSAGES.GET, (data) => {
                this.renderMessages(data);
            })
        );
        this.subscriptions.push(
            PubSub.subscribe(EVENTS.DATA.UPDATED.MESSAGES, (data) => {
                this.renderMessages(data);
            })
        );
    }

    connectedCallback() {

        this.subs();

        const state = store.getState();
        const userId = state.isLoggedIn.id;

        this.popupContainer = this.shadowRoot.querySelector(".popupContainer");

        // Triggers renderMessages from subs()
        this.allMesssages = PubSub.publish(EVENTS.REQUEST.SENT.MESSAGES.GET, {
            userId,
            msgType: "all"
        });
 
        console.log()
    }

    disconnectedCallback() {

        // Call all unsubscribe fns to remove listeners
        for (let i = 0; i < this.subscriptions.length; i++) {

            const unsub = this.subscriptions[i];
            if (unsub) {
                unsub();
            }
        }

        this.subscriptions = [];
    }

    // Open
    openPopup() {
        this.popupContainer.classList.remove("hidden");
    }

    // Close
    closePopup() {
        this.popupContainer.classList.add("hidden");
    }

    notification() {
        backgroundColor = "transparent"
    }

    getUserName(id, users) {
        const u = users.find(x => x.id === id);
        return u ? u.name : "Unknown";
    }

    getCalendarName(id, calendars) {
        const c = calendars.find(x => x.id === id);
        return c ? c.name : "Unknown calendar";
    }

    renderMessages(allMessages) {

        if (!allMessages) return;

        this.users = allMessages.users || [];
        this.calendars = allMessages.calendars || [];

        const state = store.getState();

        const container = this.shadowRoot.querySelector(".chatFeedContainer");
        container.innerHTML = "";

        const merged = [
            ...(allMessages.privateMSG || []).map(m => ({ ...m, type: "private" })),
            ...(allMessages.calendarMSG || []).map(m => ({ ...m, type: "calendar" }))
        ];

        merged.sort((a, b) => {
            const da = new Date(`${a.date}T${a.time}`);
            const db = new Date(`${b.date}T${b.time}`);
            return db - da;
        });

        for (let msg of merged) {
            
            let chatName = "";
            let senderName = "";

            if (msg.type === "private") {

                senderName = this.getUserName(msg.senderId, this.users);

                if (msg.senderId === state.isLoggedIn.id) {
                    chatName = this.getUserName(msg.receiverId, this.users);
                } else {
                    chatName = senderName;
                }

            } else if (msg.type === "calendar") {

                senderName = this.getUserName(msg.senderId, this.users);
                chatName = this.getCalendarName(msg.calId, this.calendars);

            }

            const box = document.createElement("div");
            box.classList.add("chatBox");

            box.innerHTML = `
            <div class="chatBoxContent">
                <div class="groupImg"></div>
                <div class="messageContainer">
                    <div class="messageTextContainer">
                        <h4 class="chatName">${chatName}</h4>
                        <div class="messageContent">
                            <p class="messageTextContent textContent"> ${senderName}:  ${msg.content}</p>
                        </div>
                    </div>
                    <div class="notificationCirkle"></div>
                </div>
            </div>
            `;

            // 24h noti cirkle (change to "unread" in later development)
            const now = Date.now();
            const msgDate = new Date(`${msg.date}T${msg.time}`);
            const diffHours = (now - msgDate.getTime()) / (1000 * 60 * 60);
            const notif = box.querySelector(".notificationCirkle");
            notif.classList.toggle("hidden", diffHours > 24);

            container.appendChild(box);

        }
    }

}

customElements.define("message-feed-preview", MessageFeedPreview);