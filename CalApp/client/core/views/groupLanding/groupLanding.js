import "./components/eventCard.js";
import "./components/groupDescription.js";
import "./components/groupWeekDays.js";
import { PubSub } from "../../store/pubsub.js"
import { store } from "../../store/store.js";


class CreateGroupLandingView {

    constructor() {
        this.app = document.querySelector("#app");
        this.sub();
    }

    sub() {
        PubSub.subscribe("change:view", route => {
            if (route.mainPath != "home") {
                console.log("wrong");
                return;
            }
            if (!route.url.searchParams.has("id")) {
                return;
            }

            // if (route.subPath != "groupcalendar") {
            //     console.log("wrong");
            //     return;
            // }

            console.log("created")

            // VI måste göra en instans först av store, då det är en klass, så gör det!
            let state = store.getState();
            let params = route.url.searchParams;
            let cal = state.userData.cals.find(cal => cal.id == params.get("id"));
            if (cal.id != params.get("id")) {
                return;
            }
            let calEvents = state.userData.events.filter(events => events.calId == cal.id);

            store.setState({
                currentContext: {
                    currentCal: cal,
                    currentEvents: calEvents
                }
            }, null, "calendar:events", { calEvents: calEvents });
            console.log(store.getState())

            this.render();
        })
    }

    render() {
        this.app.innerHTML = `
        <style>
            #app {
                display: flex;
                flex-direction: column;
                gap: 50px;
            }
        </style>

            <h1>Hejhejhejhejhejhejhejhej</h1>
            <week-days></week-days>
            <event-cards></event-cards>
        `;
    }


}


new CreateGroupLandingView();