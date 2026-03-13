// ROUTER
import { Router } from "./core/router/router.js"

// GLOBAL COMPONENTS
import "./components/appInput/appInput.js"; 
import "./components/bottomNav/bottomNav.js"; 
import "./components/toggleBtn/toggleBtn.js"; 


// SERVICES. (views i renderApp.js)
//import "../services/calendarService.js";
import "/core/services/notificationsService.js";
import { initNotificationsService } from "/core/services/notificationsService.js";
//import "/core/services/calendarService.js";

//QUERY-SELECTORS
const notifications = document.querySelector("#notifications");

//EVENT-LISTENERS
notifications.addEventListener("click", () => {
    history.pushState({page: "notifications"}, "", "/notifications");
    Router.init();
});

Router.init();


async function runServices() {
    initNotificationsService();
}

//runServices();
