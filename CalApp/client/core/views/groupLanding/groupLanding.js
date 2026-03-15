import "./components/eventCard.js";
import "./components/groupDescription.js";
import "./components/groupWeekDays.js";
import { PubSub } from "../../store/pubsub.js"

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
            if (route.subPath != "event") {
                console.log("wrong");
                return;
            }
            console.log("created")
            this.render();
        })
    }

    render() {
        this.app.innerHTML = `
            <h1>Hejhejhejhejhejhejhejhej</h1>
            <event-cards></event-cards>
        `;
    }


}


new CreateGroupLandingView();