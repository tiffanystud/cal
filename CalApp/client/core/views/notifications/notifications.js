import { apiRequest } from "../../services/api.js";
import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";

export class CreateNotificationsView {
    static displayInfo = {};
    static loadedNotiCards = [];
    constructor(root) {
        this.root = root;
        PubSub.subscribe("change:view", (data) => {
            if (data.mainPath === "home" && data.subPath === "notifications") {
                //Testade att koppla samman notify och publish men fungerade inte när man 
                //skrev /notifications direkt in i URL:en och render() metoden kördes 6 gånger
                //för någon anledning

                // store.subscribe("notis", () => {
                //     this.render();
                // });
                // PubSub.publish(EVENTS.REQUEST.SENT.EVENTS.GET);

                this.root.innerHTML = `<h1 style="font-family: Helvetica;">Notifications</h1>
                <div style="display: flex; gap: 10px;">
                <regular-button id="mark-read">Mark all as read</regular-button>
                <regular-button id='delete-all'>Delete all notifications</regular-button>
                </div>
                <p id="loading-msg">Getting notifications...</p>`;
                this.render(document.querySelector("#loading-msg"));
                //this.display();
            }
        });

        PubSub.subscribe("change:view", (data) => {
            if (data.mainPath === "notiTest") {
                this.notiTest();
            }
        })

        PubSub.subscribe("Network:Error", () => {
            this.errorMsg("network");
        });
    }

    async notiTest() {
        let h4 = document.createElement("h4");
        h4.textContent = "Notifications";
        h4.style.margin = 0;
        this.root.appendChild(h4);
        let notifications = store.getState().notis;
        notifications = notifications.filter((x) => x.type === "event");

        notifications = notifications.sort((a, b) => a.notiContent.time.localeCompare(b.notiContent.time));
        notifications = notifications.sort((a, b) => new Date(a.notiContent.date) - new Date(b.notiContent.date));

        let notiBar = document.createElement("notifications-bar");
        notiBar.notis = notifications;
        this.root.appendChild(notiBar);
    }

    display() {
        for (let i=0; i<this.root.children.length; i++) {
            let child = this.root.children[i];
            child.style.display = CreateNotificationsView.displayInfo[i];
        }
    }

    async errorMsg(type, resp) {
        if (type === "network") {
            this.root.innerHTML = `
            <p>Network error, server unreachable</p>
            `;
        } else if (type === "request") {
            let reso = await resp.json();
            this.root.innerHTML = `
            <p>Status: ${resp.status}<br>${reso.error}</p>
            `;
        } else {
            let reso = await resp.text();
            this.root.innerHTML = `<p>${reso}</p>`;
        }
    }
    
    //köra render initialt och sedan bara display: none på allt?
    //sedan display allt när change:view?
    async render(loadingMsg) {
        if (store.getState().userData.notis.length !== 0) {
            this.root.innerHTML = `<h1 style="font-family: Helvetica;">Notifications</h1>
            <div style="display: flex; gap: 10px;">
            <regular-button id="mark-read">Mark all as read</regular-button>
            <regular-button id='delete-all'>Delete all notifications</regular-button>
            </div>`;

            for (let notiCard of CreateNotificationsView.loadedNotiCards) {
                this.root.appendChild(notiCard);
            }

            this.root.appendChild(document.createElement("bottom-nav"));

            document.querySelector("#delete-all").addEventListener("click", () => {
                //Skicka request att ta bort alla notifikationer. Om request går bra gör:
                let notis = document.querySelectorAll("notification-card");
                notis.forEach((x) => {
                    this.root.removeChild(x);
                });
                this.root.innerHTML += "<p>No notifications to view!</p>";
            });
        } else {
            try {
                let notifications = await apiRequest({
                    entity: `notifications?userId=${store.getState().isLoggedIn.id}`,
                    method: "GET"
                });

                notifications = notifications.sort((a, b) => a.notiContent.time.localeCompare(b.notiContent.time));
                notifications = notifications.sort((a, b) => new Date(a.notiContent.date) - new Date(b.notiContent.date));

                store.setState({userData: {
                    ...store.getState().userData,
                    notis: notifications
                }});


                for (let noti of store.getState().userData.notis) {
                    let notiCard = document.createElement("notification-card");
                    if (noti.type === "message") {
                        let sender = await apiRequest({
                            entity: `users?id=${noti.notiContent.senderId}`,
                            method: "GET"
                        });
                        notiCard.sender = sender;
                        if (noti.notiContent.calId) {
                            let cal = await apiRequest({
                                entity: `calendars?id=${noti.notiContent.calId}`,
                                method: "GET"
                            });
                            notiCard.cal = cal;
                        }
                    }
                    notiCard.data = noti.notiContent;
                    notiCard.notiId = noti.id;
                    notiCard.type = noti.type;
                    CreateNotificationsView.loadedNotiCards.push(notiCard);
                    this.root.appendChild(notiCard);
                }

                this.root.appendChild(document.createElement("bottom-nav"));


                document.querySelector("#delete-all").addEventListener("click", () => {
                    //Skicka request att ta bort alla notifikationer. Om request går bra gör:
                    let notis = document.querySelectorAll("notification-card");
                    notis.forEach((x) => {
                        this.root.removeChild(x);
                    });
                    this.root.innerHTML += "<p>No notifications to view!</p>";
                });

                loadingMsg.remove();

                store.subscribe("notis", async (data) => {
                    for (let noti of store.getState().userData.notis) {
                        let exists = CreateNotificationsView.loadedNotiCards.find((x) => x.notiId === noti.id);
                        if (exists) continue;

                        let notiCard = document.createElement("notification-card");
                        if (noti.type === "message") {
                            let sender = await apiRequest({
                                entity: `users?id=${noti.notiContent.senderId}`,
                                method: "GET"
                            });
                            notiCard.sender = sender;
                            if (noti.notiContent.calId) {
                                let cal = await apiRequest({
                                    entity: `calendars?id=${noti.notiContent.calId}`,
                                    method: "GET"
                                });
                                notiCard.cal = cal;
                            }
                        }
                        notiCard.data = noti.notiContent;
                        notiCard.notiId = noti.id;
                        notiCard.type = noti.type;
                        CreateNotificationsView.loadedNotiCards.push(notiCard);
                    }
                });
            } catch (e) {
                this.errorMsg("request", e.response);
            }    

        } 
    }
    
}

new CreateNotificationsView(document.querySelector("#app"));