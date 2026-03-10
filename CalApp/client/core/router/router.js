
import {myGroupView} from "../views/myGroupView/myGroupView.js";

export function handleRouter(pathName) {
    console.log(pathName)
    let segments = pathName.split("/").filter(Boolean);
    console.log(segments)
    let path = "";
    if(segments[0])
    if(segments[0] === "home" && segments[1] === "myGroupView") { // /home/myGroupView
        console.log("myGroupView")
        myGroupView();
    } else if(segments[0] === "home" && segments[1] === "myCalView") { // /home/myCalView
        console.log("myCalView")
        //Do something
    } else if(segments[0] === "home") { // home
        console.log("home page")
        //Do something
    } else {
        console.log("404: Page not found")
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
