import "./components/eventCard.js";
import "./components/groupDescription.js";
import "./components/groupWeekDays.js";
import "../../../components/bottomNav/bottomNav.js";
import { PubSub } from "../../store/pubsub.js"
import { store } from "../../store/store.js";


class CreateGroupLandingView {

    constructor() {
        this.app = document.querySelector("#app");
        this.sub();
    }

    sub() {
        PubSub.subscribe("change:view", async route => {
            if (route.mainPath != "home") {
                console.log("wrong");
                return null;
            }
            if (!route.url.searchParams.has("id")) {
                return null;
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
                return null;
            }
            let calEvents = state.userData.events.filter(events => events.calId == cal.id);

            // Render körs här innan setState eftersom komponent-taggarna måste finnas innan då notify skickas vid setState och 
            // komponenterna kommer inte kunna få notify om de inte finns innan det körs.w
            this.render();

            store.setState({
                currentContext: {
                    currentCal: cal,
                    currentEvents: calEvents
                }
            }, null, "calendar:events", { calEvents: calEvents, calInfo: cal })


            console.log(store.getState())
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

            <group-description></group-description>
            <week-days></week-days>
            <event-cards></event-cards>
            <bottom-nav></bottom-nav>
        `;
    }


}


new CreateGroupLandingView();