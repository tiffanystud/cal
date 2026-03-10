import {GroupContainerBoxComp} from "./components/groupBoxContainerComp/groupBoxContainerComp.js"

export function myGroupView() {
    customElements.define("groupBox-comp", GroupContainerBoxComp);
    let app = document.getElementById("app");
    app.innerHTML = `<groupBox-comp></groupBox-comp>`;
}


