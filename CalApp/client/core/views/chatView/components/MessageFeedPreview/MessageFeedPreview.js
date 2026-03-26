

import { EVENTS } from "../../../../store/events.js";
import { PubSub } from "../../../../store/pubsub.js";
import { store } from "../../../../store/store.js";

export class MessageFeedPreview extends HTMLElement {

    constructor() {

        super();
        this.subs();

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

                .notificationCirkle {
                    width: 8px;
                    height: 8px;
                    background-color: red;
                    border-radius: 50%;
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

        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.MESSAGES, () => {
            // openPopup()
        })

        PubSub.subscribe(EVENTS.RESPONSE.RECEIVED.MESSAGES.GET, (data) => {
            this.renderMessages(data);
        });

    }

    connectedCallback() {

        // Gör en loading screen?

        const state = store.getState();
        const userId = state.isLoggedIn.id;

        this.allMesssages = PubSub.subscribe(EVENTS.REQUEST.SENT.MESSAGES.GET, {
            userId,
            msgType: "all"
        });



        this.popupContainer = this.shadowRoot.querySelector(".popupContainer");






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

    renderMessages(allMessages) {

        const container = this.shadowRoot.querySelector(".chatFeedContainer");
        container.innerHTML = "";

        if (!allMessages) return;

        const merged = [
            ...(allMessages.privateMSG || []).map(m => ({ ...m, type: "private" })),
            ...(allMessages.calendarMSG || []).map(m => ({ ...m, type: "calendar" }))
        ];

        merged.sort((a, b) => {
            const da = new Date(`${a.date}T${a.time}`);
            const db = new Date(`${b.date}T${b.time}`);
            return db - da;
        });

        const now = Date.now();

        for (let msg of merged) {

            let chatName = "";
            let senderName = "";

            if (msg.type === "private") {
                senderName = store.getUserName(msg.senderId);
                chatName = senderName;
            }

            if (msg.type === "calendar") {
                senderName = store.getUserName(msg.senderId);
                chatName = store.getCalendarName(msg.calId);
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
                            <p class="messageTextContent textContent">
                                ${senderName}: ${msg.content}
                            </p>
                        </div>

                    </div>

                    <div class="notificationCirkle"></div>

                </div>

            </div>
        `;

            // 24 h notification cirkle (lastlogged "unseen" in implementation later)
            const msgDate = new Date(`${msg.date}T${msg.time}`);
            const diffMs = now - msgDate.getTime();
            const diffHours = diffMs / (1000 * 60 * 60);

            const notif = box.querySelector(".notificationCirkle");

            if (diffHours > 24) {
                notif.classList.add("hidden");
            } else {
                notif.classList.remove("hidden");
            }

            container.appendChild(box);
        }
    }

}


customElements.define("message-feed-preview", MessageFeedPreview);