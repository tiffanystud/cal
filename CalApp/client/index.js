// ROUTER
import { Router } from "./core/router/router.js"
import { TestRouter } from "./core/router/router.js";

// GLOBAL COMPONENTS
import "./components/appInput/appInput.js";
import "./components/bottomNav/bottomNav.js";
import "./components/toggleBtn/toggleBtn.js";


// SERVICES. (views i renderApp.js)
import "../services/calendarService.js";
import "./core/services/calendarService.js";

console.log("index loaded")

Router.init();



// TEST

import "./core/views/groupLanding/groupLanding.js";

let test = new TestRouter(window.location.pathname);

test.init();

