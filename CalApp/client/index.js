// ROUTER
import { Router } from "./core/router/router.js";
export const newRouter = new Router(window.location.href);


// GLOBAL COMPONENTS
import "./components/appInput/appInput.js";
import "./components/bottomNav/bottomNav.js";
import "./components/toggleBtn/toggleBtn.js";
import "./components/addMembers/addMembers.js";
import "./components/searchUsersModal/searchUsersModal.js";


// SERVICES. (init all pubsub)
import "./core/services/calendarsService.js"


// VIEWS
import "./core/views/createEvent/createEvent.js";
import "./core/views/groupLanding/groupLanding.js";
import "./core/views/home/homeView.js";
import "./core/views/notifications/notifications.js";


newRouter.init();