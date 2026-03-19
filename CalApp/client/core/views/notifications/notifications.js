import { apiRequest } from "../../services/api.js";
import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";
import { NotificationCard } from "./components/notification-card.js";
import { RegularButton } from "../../../components/regularButton/regularButton.js";
import { BottomNav } from "../../../components/bottomNav/bottomNav.js";


export class CreateNotificationsView {
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

                this.render();
            }
        });

        PubSub.subscribe("Network:Error", () => {
            this.errorMsg("network");
        });
    }

    async errorMsg(type, resp) {
        let reso = await resp.json();
        if (type === "network") {
            this.root.innerHTML = `
            <p>Network error, server unreachable</p>
            `
        } else {
            this.root.innerHTML = `
            <p>Status: ${resp.status}<br>${reso.error}</p>
            `
        }
    }

    async render() {
        //Hämtar "notifikationerna" när render körs. Vet inte om detta är rätt tänkt, men det funkar.
        //Annars blev effekten oftast att state inte hunnit uppdaterats när redner kördes, så
        //store.getState().notis var bara en tom array [] (loopen kördes inte).
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
            console.log(store.getState());

            this.root.innerHTML = `<h1 style="font-family: Helvetica;">Notifications</h1>
            <div style="display: flex; gap: 10px;">
            <regular-button id="mark-read">Mark all as read</regular-button>
            <regular-button id='delete-all'>Delete all notifications</regular-button>
            </div>`;
            console.log(store.getState().userData.notis);
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
                notiCard.type = noti.type;
                this.root.appendChild(notiCard);
            }

            this.root.appendChild(document.createElement("bottom-nav"));

            document.querySelector("#mark-read").addEventListener("click", () => {
                console.log("//Skicka request att markera alla som lästa");
            });

            document.querySelector("#delete-all").addEventListener("click", () => {
                //Skicka request att ta bort alla notifikationer. Om request går bra gör:
                let notis = document.querySelectorAll("notification-card");
                notis.forEach((x) => {
                    this.root.removeChild(x);
                });
                this.root.innerHTML += "<p>No notifications to view!</p>";
            });
        } catch (e) {
            this.errorMsg("other", e.response);
        } 
    }

    subscribeToStore() {
        store.subscribe("notificationsUpdated", (state) => {
            //Do something
        });
    }
}

new CreateNotificationsView(document.querySelector("#app"));