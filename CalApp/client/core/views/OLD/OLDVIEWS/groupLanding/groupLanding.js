import "./components/eventCard.js";
import "./components/groupDescription.js";
import "./components/groupWeekDays.js";
import "../../../components/bottomNav/bottomNav.js";
import { PubSub } from "../../store/pubsub.js"
import { store } from "../../store/store.js";

// Tanken är att my calendar och my groups delar samma vy

class CreateGroupLandingView {

    constructor() {
        this.app = document.querySelector("#app");
        this.sub();
    }

    sub() {
        PubSub.subscribe("change:view", route => {
            if (route.mainPath == "home" && route.url.searchParams.has("id")) {

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

            }
        })
        // Subscribar på change:page vid my calendar knapptrycket
        PubSub.subscribe("change:page", route => {
            if (route.page == "myCal") {

                let state = store.getState();
                let userId = state.isLoggedIn.id;
                // Hämtar alla userGroups för usern inloggad
                let userGroups = state.userData.usergroups.filter(userGroup => userGroup.userId == userId);
                let userCal;
                // Hämtar calendar för user som är inloggad
                for (let userGroup of userGroups) {
                    userCal = state.userData.cals.find(userCal => userCal.id == userGroup.calId && userCal.type == "private");
                    if (userCal) {
                        break;
                    }
                }



                // Hämtar events för den calendar
                let calEvents = state.userData.events.filter(events => events.calId == userCal.id);

                // Först renderas komponentaggarna innan den notifyar, så komponenten finns när notify körs
                this.render();

                // Sätter det nya statet och notifyar
                store.setState({
                    currentContext: {
                        currentCal: userCal,
                        currentEvents: calEvents
                    }
                }, null, "calendar:events", { calEvents: calEvents, calInfo: userCal })
            }
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