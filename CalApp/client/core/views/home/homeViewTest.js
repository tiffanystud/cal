import { HomeView } from "./homeView.js"

export function renderHome() {
    let app = document.getElementById("app");
    let viewBox = document.createElement("div");
    viewBox.style.padding = "16px"
    app.appendChild(viewBox);
    let view = document.createElement("home-view")
    viewBox.replaceChildren(view)

}
