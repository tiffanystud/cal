import { apiRequest } from "../../services/api.js";
import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";
import { NotificationCard } from "./components/notification-card.js";

customElements.define("notification-card", NotificationCard);


export class CreateNotificationsView {
    constructor(root) {
        this.root = root;

        PubSub.subscribe("pageChanged", (data) => {
            if (data === "notifications") {
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
    }

    async render() {
        //Hämtar "notifikationerna" när render körs. Vet inte om detta är rätt tänkt, men det funkar.
        //Annars blev effekten oftast att state inte hunnit uppdaterats när redner kördes, så
        //store.getState().notis var bara en tom array [] (loopen kördes inte).
        let notifications = await apiRequest({
            entity: "events",
            method: "GET"
        });

        store.setState({notis: notifications});

        this.root.innerHTML = "";
        console.log(store.getState().notis);
        for (let noti of store.getState().notis) {
            let notiCard = document.createElement("notification-card");
            notiCard.data = noti;
            this.root.appendChild(notiCard);
        }
    }

    subscribeToStore() {
        store.subscribe("notificationsUpdated", (state) => {
            //Do something
        });
    }
}