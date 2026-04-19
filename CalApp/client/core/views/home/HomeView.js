
// GLOBAL
import "../../../components/notificationsBar/notificationsBar.js"
import "../../../components/bottomNav/bottomNav.js"
import "../../../components/searchUsersModal/searchUsersModal.js"

// VIEW-SPECIFIC
import "./components/WeekChartComp/WeekChartElem.js"
import "./components" // eventCardPopup
import "./components" // searchTagsBtn
import "./components" // calDetailBtn
import "./components" // landingButtons


export class homeView {

    renderHTML(isLoggedIn) {
        
        const content = document.querySelector("#content");
        
        if (isLoggedIn) {
            
            content.innerHTML = `
                <notifications-bar></notifications-bar>
                <detail-container></detail-container>
                <filter-cals></filter-cals>
                <week-chart-comp><week-chart-comp>
                <search-tags></search-tags>
                <event-cards></event-cards>
                <create-popup></create-popup>
                <search-users-modal-test></search-users-modal-test>
                <event-card-popup></event-card-popup>
            `;
            
        } else {
            
            content.innerHTML = `
                <div>Please sign in</div>
            `;
            
        }
        
    }
}

export const HomeView = new homeView();