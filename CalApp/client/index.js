// ROUTER
import { Router } from "./core/router/router.js";
export const newRouter = new Router(window.location.href);


// GLOBAL COMPONENTS
import "./components/addMembers/addMembers.js";
import "./components/appInput/appInput.js";
import "./components/bottomNav/bottomNav.js";
import "./components/searchUsersModal/searchUsersModal.js";
import "./components/toggleBtn/toggleBtn.js";
import "./components/createPopup/createPopup.js";
import "./components/messageBox/messageBox.js";


// SERVICES (init all pubsub)
import "./core/services/calendarsService.js"
import "./core/services/userGroupsService.js";
import "./core/services/notificationsService.js";
import "./core/services/storeService.js"
import "./core/services/homeService.js";
import "./core/services/neoTest.js";
import "./core/services/messagesService.js";

// VIEWS
import "./core/views/createEvent/createEvent.js";
import "./core/views/createGroup/createGroupView.js";
import "./core/views/groupLanding/groupLanding.js";
import "./core/views/notifications/notifications.js";
import "./core/views/myGroupView/groupBoxContainerComp.js";
import "./core/views/contacts/contactsView.js";
import "./core/views/profileView/profileView.js";
import "./core/views/login/loginView.js"
import "./core/views/newHomeView/newHomeView.js";
import "./core/views/home/homeView.js";
import "./core/views/chatView/chatView.js"

// DEVELOPMENT
import "./core/views/development/development.js";
import { EVENTS } from "./core/store/events.js";
import { PubSub } from "./core/store/pubsub.js";
PubSub.subscribe("change:view", (data) => {

    const { mainPath, subPath } = data;

    // 1. Om subPath matchar en PAGE → använd den
    if (subPath && EVENTS.VIEW.PAGE.SHOW[subPath.toUpperCase()]) {
        PubSub.publish(EVENTS.VIEW.PAGE.SHOW[subPath.toUpperCase()], data);
        return;
    }

    // 2. Annars använd mainPath
    if (mainPath && EVENTS.VIEW.PAGE.SHOW[mainPath.toUpperCase()]) {
        PubSub.publish(EVENTS.VIEW.PAGE.SHOW[mainPath.toUpperCase()], data);
        return;
    }

});


// START
newRouter.init();

/* PubSub.subscribe("change:view", (data) => {
    console.log("INDEX.JS RECEIVED:", data.mainPath, data.subPath);
    
    const page = data.mainPath;     // från router ex. "createGroup"
    const key = page.toUpperCase(); // "CREATEGROUP"

    if (EVENTS.VIEW.PAGE.SHOW[key]) {
        PubSub.publish(EVENTS.VIEW.PAGE.SHOW[key], data);
    console.log("INDEX.JS MAPPING:", { mainPath: page, subPath: data.subPath, key, event: EVENTS.VIEW.PAGE.SHOW[key] });
    }
}); */
