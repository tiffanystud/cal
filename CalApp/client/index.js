// ROUTER
import { Router } from "./core/router/router.js";
// export const newRouter = new Router(window.location.href);


// GLOBAL COMPONENTS
import "./components/addMembers/addMembers.js";
import "./components/appInput/appInput.js";
import "./components/bottomNav/bottomNav.js";
// import "./components/searchUsersModal/searchUsersModal.js";
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
import "./core/OLDVIEWS/createEvent/createEvent.js";
import "./core/OLDVIEWS/createGroup/createGroupView.js";
import "./core/OLDVIEWS/groupLanding/groupLanding.js";
import "./core/OLDVIEWS/notifications/notifications.js";
import "./core/OLDVIEWS/myGroupView/groupBoxContainerComp.js";
import "./core/OLDVIEWS/contacts/contactsView.js";
import "./core/OLDVIEWS/profileView/profileView.js";
import "./core/OLDVIEWS/login/loginView.js"
import "./core/OLDVIEWS/newHomeView/newHomeView.js";
import "./core/OLDVIEWS/home/homeView.js";
import "./core/OLDVIEWS/chatView/chatView.js"

// DEVELOPMENT (dummy-login)
import "./core/OLDVIEWS/development/development.js";
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
Router.init();
