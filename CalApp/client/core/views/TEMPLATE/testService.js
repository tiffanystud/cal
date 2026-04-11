import { PubSub } from "../../../store/pubsub.js";
import { EVENTS } from "../../../store/events.js";
import { Router } from "../../../router/router.js";
import { TestView } from "./testView.js";

export class testService {

    constructor() {
        this.subs();
        this.eListeners();
    }

    subs() {
        // Router pub?
        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.ANY, (data) => {
            if (data.mainPath === "home") {
                TestView.renderHTML();
            }
        })

        // Login som vid på home
        PubSub.subscribe(EVENTS.AUTH.LOGIN.SUCCESS, () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" }, true);
        }, true);

        // Logout som sker vid profile
        PubSub.subscribe(EVENTS.AUTH.LOGOUT.SUCCESS, () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" }, true);
        }, true);

        // Open comp1/popup


        // Open comp1/popup
    }

    eListeners() {

        const testContainer = document.querySelector("test-container");
        const testCard = document.querySelector("test-card");

        testContainer.addEventListener("click", () => {

            // Sker vid knappryck, skickar ej searchParams
            PubSub.publish(EVENTS.VIEW.POPUP.SHOW.TEST1,
                () => { }
            )

        });

        testCard.addEventListener("click", () => {

            this.setURL(urlParams)

            // Sker vid knappryck, och skickar med searchParams
            PubSub.publish(EVENTS.VIEW.POPUP.SHOW.TEST2,
                function (urlParams) {
                    return urlParams;
                }
            )
        })

    }

    setURL(newURL) {
        // Sätt url till view
        Router.updateUrl(newURL);

    }


}

// Eller andra alt?
export const TestService = new testService();
