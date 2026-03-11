import { HomeView} from "./homeView.js"

export function homeView() {
    customElements.define("home-view-comp", HomeView);
    let app = document.getElementById("app");
    app.innerHTML = `<home-view-comp></home-view-comp>`;

    
}
