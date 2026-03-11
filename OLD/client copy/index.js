import { UrlRouter } from "./core/router/router.js";

// services
import { initCalendarService } from "./core/services/calendarsService.js";



// handleRouter(window.location.pathname);

UrlRouter();

// back/forward support
// window.addEventListener("popstate", () => {
//     handleRouter(window.location.pathname);
// });

initCalendarService();
//initNotificationsService();