import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";
import "./components/filterCals.js";
import "./components/eventCard.js";
import "./components/groupWeekDays.js";

class CreateGroupLandingView {

    constructor() {
        this.app = document.querySelector("#app");
        this.sub();
    }

    sub() {
        // PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.HOME, (data) => {
        //     this.render();
        // });
        // PubSub.subscribe("change:view", (route) => {
        //     if (route.url.pathname === "/newHomeViewTest") {
        //         this.render();
        //     }
        // })
    }




    render() {
        this.app.innerHTML = `
        <style>
            #content {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            #container {
                display: flex;
                flex-direction: column;
                height: 80%; 
                overflow-y: auto;
                gap: 10px;
            } 
        </style>

        <div id="content">
            <div id="container">
                <filter-cals></filter-cals>
                <week-days></week-days>
                <event-cards></event-cards>
            </div>
            <bottom-nav></bottom-nav>
        </div>
        `;
    }


}


new CreateGroupLandingView();