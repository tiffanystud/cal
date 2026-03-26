import { PubSub } from "../../core/store/pubsub.js";
import { apiRequest } from "../../core/services/api.js";

export class SearchUsersModal extends HTMLElement {

    constructor() {
        super();
        this.subscriptions = [];

        this.attachShadow({ mode: "open" });
        this.shadowRoot.innerHTML = `
            <style>
                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.45);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 99999; 
                }

                .hidden {
                    display: none;
                }

                .modal {
                    background: white;
                    width: 320px;
                    padding: 16px;
                    border-radius: 6px;
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.25);
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .close-btn {
                    background: transparent;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                }

                /* Input */
                .search-input {
                    width: 100%;
                    padding: 8px;
                    box-sizing: border-box;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                /* Result-list */
                .results-container {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                /* search row */
                .result-row {
                    padding: 8px;
                    background: #f2f2f2;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .result-row:hover {
                    background: #e0e0e0;
                }
            </style>

            <div class="modal-backdrop hidden">
                <div class="modal">

                    <div class="modal-header">
                        <h3>Search users</h3>
                        <button class="close-btn">X</button>
                    </div>

                    <input class="search-input" type="text" placeholder="Search user...">

                    <div class="results-container"></div>

                </div>
            </div>
        `;

    }

    connectedCallback() {

        this.popupContainer = this.shadowRoot.querySelector(".popupContainer");

        // Get userId
        const state = store.getState();
        const userId = state.isLoggedIn.id;

        // Initiate subscriprions
        this.subs();

        // Get all MSGS
        PubSub.publish(EVENTS.REQUEST.SENT.MESSAGES.GET, {
            userId,
            msgType: "all"
        });
    }

    subs() {

        // Subscribe popup show, save returned unsubscribe fn
        this.subscriptions.push(
            PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.MESSAGES, () => {
                this.openPopup();
            })
        );

        // Subscribe messages received, save returned unsubscribe fn
        this.subscriptions.push(
            PubSub.subscribe(EVENTS.RESPONSE.RECEIVED.MESSAGES.GET, (data) => {
                this.renderMessages(data);
            })
        );
    }

    disconnectedCallback() {
        // Call all unsubscribe fns to remove listeners
        this.subscriptions.forEach(unsub => unsub && unsub());
        this.subscriptions = [];
    }

    openPopup() {
        this.popupContainer.classList.remove("hidden");
    }

    closePopup() {
        this.popupContainer.classList.add("hidden");
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
            } else if (msg.type === "calendar") {
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
                                    ${senderName}:  ${msg.content}
                                </p>
                            </div>
                        </div>
                        <div class="notificationCirkle"></div>
                    </div>
                </div>
            `;

            // 24h noti cirkle (change to "unread" in later development)
            const msgDate = new Date(`${msg.date}T${msg.time}`);
            const diffHours = (now - msgDate.getTime()) / (1000 * 60 * 60);
            const notif = box.querySelector(".notificationCirkle");
            notif.classList.toggle("hidden", diffHours > 24);

            container.appendChild(box);
        }
    }

}

customElements.define("message-feed-preview", MessageFeedPreview);