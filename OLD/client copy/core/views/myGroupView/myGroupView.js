import {GroupContainerBoxComp} from "./components/groupBoxContainerComp/groupBoxContainerComp.js"
import {apiRequest} from "../../services/api.js"

export function myGroupView() {
    customElements.define("group-box-comp", GroupContainerBoxComp);
    let app = document.getElementById("app");
    app.innerHTML = `<group-box-comp></group-box-comp>`;

    
}



