
import "./testService";
// import { TestService } from "./testService";

export class TestView {

    constructor() {
        // this.subs(); 
    }

    /* subs() {

        // Router pub?
        PubSub.subscribe("change:page", (data) => {
            if (data.page === "home") {
                this.render();
            }
        })

        // Login
        PubSub.subscribe(EVENTS.AUTH.LOGIN.SUCCESS, () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" }, true);
        }, true);

        // Logout
        PubSub.subscribe(EVENTS.AUTH.LOGOUT.SUCCESS, () => {
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME, { page: "home" }, true);
        }, true);

    } */

    renderHTML() {

        let content = document.querySelector("#content");
        content.innerHTML = `
            <notifications-bar></notifications-bar>
            <detail-container></detail-container>
            <filter-cals></filter-cals>
            <week-chart></week-chart>
            <search-tags></search-tags>
            <event-cards></event-cards>
            <create-popup></create-popup>
            <search-users-modal-test></search-users-modal-test>
            <event-card-popup></event-card-popup>
        `;

    }
    
}

new TestView();