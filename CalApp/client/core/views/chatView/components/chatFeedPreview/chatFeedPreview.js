

import { EVENTS } from "../../../../store/events.js";
import { PubSub } from "../../../../store/pubsub.js";

export class ChatFeedPreview extends HTMLElement {

    constructor() {
        
        super();
        this.subs();
        this.innerHTML = `
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
        PubSub.subscribe(EVENTS.VIEW.POPUP.ChatFeedPreview, () => {
            // openPopup()
        })
    }

    connectedCallback() {

        this.popupContainer = this.shadowRoot.querySelector(".popupContainer");
        
        




        this.deleteBtn.addEventListener("click", () => {

            payload = {
                chatId: "",

            }

            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.CHAT, { chatId });
            PubSub.publish(EVENTS.STORE.UPDATED.CALENDARS);
            // Ska context skickas vidare?
            this.closeModal();
        });
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
    
    renderMessages() {
    
        const allMessages = ""
    }
    
}
