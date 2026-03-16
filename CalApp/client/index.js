// ROUTER
// import { Router } from "./core/router/router.js"
import { TestRouter } from "./core/router/router.js";

// // GLOBAL COMPONENTS
// import "./components/appInput/appInput.js";
// import "./components/bottomNav/bottomNav.js";
// import "./components/toggleBtn/toggleBtn.js";


// // SERVICES. (views i renderApp.js)
// import "../services/calendarService.js";
// import "./core/services/calendarService.js";


// ROUTER

import "./core/views/groupLanding/groupLanding.js";

let test = new Router(window.location.pathname);

test.init();

