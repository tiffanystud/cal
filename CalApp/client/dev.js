// ROUTER
import { Router } from "./core/router/Router.js";
// export const newRouter = new Router(window.location.href);


// GLOBAL COMPONENTS
/* NONE (for now) */


// SERVIVES (API)
import "./core/services/enteties/HomeAPIService.js"
import "./core/services/enteties/CalendarAPIService.js"


// SERVIVES (VIEWS)
import "./core/views/home/HomeViewService.js"


// VIEWS
/* None? Loaded by each view servie? */




// START
Router.init();
