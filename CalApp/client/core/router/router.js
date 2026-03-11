export function handleRouter(pathName) {
    let segments = pathName.split("/").filter(Boolean);

    if (segments[0] === "client") {
        segments.splice(0, 1);
    }
    console.log(`ROUTER: ${segments}`);


    if (segments[0] === "home" && segments[1] === "myGroupView") {
        console.log("myGroupView");
    } else if (segments[0] === "home" && segments[1] === "myCalView") {
        console.log("myCalView");
    } else if (segments[0] === "home") {
        console.log("home page");
    } else {
        console.log("404: Page not found");
    }
}









/*
const routes = {
    "/CalApp/index.html": () => {
        console.log("/CalApp/index.html page");
    },
    "/": () => {
        console.log("/ page");
    },
    "/groupsView": () => {
        console.log("/groupsView page");
        groupsView();
    },
    "/createNewCalendar": () => {
        const view = new CreateCalendarView(document.querySelector("#app"));
        view.render();
    },
    "/notifications": () => {
        const view = new CreateNotificationsView(document.querySelector("#app"));
        view.render();
    },
    "/groupLandingView": () => {
        createGroupLandingView();
    }
};
  
export function UrlRouter() {
    const path = window.location.pathname;
    if (routes[path]) {
      routes[path]();
    } else {
      console.warn("No route found:", path);
    }
}

*/
