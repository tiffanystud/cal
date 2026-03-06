// import displayHome from "../views/home/home.js";
import {CreateCalendarView} from "../views/createCalendar/createCalendarView.js"; 


const routes = {
/*     "/": () => {
      displayHome();
    },
    "/home": () => {
      displayHome();
    },
    "/home/groupsView": () => {
      groupsView();
    }, */
    "/createNewCalendar": () => {
        const view = new CreateCalendarView(document.querySelector("#app"));
        view.render();
    }
};

export function UrlRouter() {
/*     const url = window.location.pathname;
    routes[url](); */
    
    const fullPath = window.location.pathname;
    const path = "/" + fullPath.split("/").pop(); // tar sista delen

    if (routes[path]) {
        routes[path]();
    } else {
        console.warn("No route found: ", path);
        // routes["/"]();
    }
}

// Kör routern en gång direkt när filen läses in
UrlRouter();

// Lyssnar på framåt och tillbaka 
window.addEventListener("popstate", UrlRouter);