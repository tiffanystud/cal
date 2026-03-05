import displayHome from "../views/home/home.js";
const routes = { // Navbaren
    "/home": () => {
      displayHome();
    },
    "/home/groupsView": () => {

    }
};



function UrlRouter() {
    const url = window.location.pathname;
    routes[url]();
}

window.addEventListener("popstate", UrlRouter);