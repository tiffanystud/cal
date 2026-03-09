import {Store} from "./core/store/store.js";
import { UrlRouter } from "./core/router/router.js";

// comps
import "./components/appInput/appInput.js";
import "./components/toggleBtn/toggleBtn.js";

// services
import { initCalendarService } from "./core/services/calendarsService.js";
import { initNotificationsService } from "./core/services/notificationsService.js";

// Kör routern
UrlRouter();

initCalendarService();
initNotificationsService();