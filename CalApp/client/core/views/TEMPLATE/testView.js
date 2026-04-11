
import "./testService";
// import { TestService } from "./testService";

export class testView {

    renderHTML() {

        const content = document.querySelector("#content");
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

export const TestView = new testView();