import { PubSub } from "../../store/pubsub.js";

class CreateGroupLandingView {

    constructor() {
        this.app = document.querySelector("#app");
        this.sub();
    }

    sub() {
        PubSub.subscribe("change:view", (data) => {
            if (data.url.pathname === "/newHomeViewTest") {
                this.render();
            }
        })
    }




    render() {
        this.app.innerHTML = `
        <style>
            #content {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            #container {
                display: flex;
                flex-direction: column;
                height: 80%; 
                overflow-y: auto;
                gap: 10px;
            } 
        </style>

        <div id="content">
            <div id="container">
                <filter-cals></filter-cals>
                <week-days></week-days>
                <event-cards></event-cards>
            </div>
            <bottom-nav></bottom-nav>
        </div>
        `;
    }


}


new CreateGroupLandingView();