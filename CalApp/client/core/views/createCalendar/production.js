// ROUTER
// import { Router } from "./core/router/router.js"

// GLOBAL COMPONENTS (byt från relative?)
import "../../../components/appInput/appInput.js"
import "../../../components/bottomNav/bottomNav.js"
import "../../../components/toggleBtn/toggleBtn.js"
import "../../../components/searchUsersModal/searchUsersModal.js"
import "../../../components/addMembers/addMembers.js"

// SERVICES
import {calendarService} from "../../services/calendarsService.js";
import {userGroupsService} from "../../services/userGroupsService.js";
calendarService();
userGroupsService();

// Router.init();