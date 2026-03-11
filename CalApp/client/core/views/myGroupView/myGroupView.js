import {GroupContainerBoxComp} from "./components/groupBoxContainerComp/groupBoxContainerComp.js"

export function myGroupView() {
    if (!customElements.get("groupBox-comp")) {
        customElements.define("groupBox-comp", GroupContainerBoxComp);
        let app = document.getElementById("app");
        app.innerHTML = `<groupBox-comp></groupBox-comp>`;
    }
    
    
}


