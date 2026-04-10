import { PubSub } from "../../store/pubsub.js";
import { store } from "../../store/store.js";
import { newRouter } from "../../../index.js";

export class GroupContainerBoxComp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        PubSub.subscribe("change:page", (data) => {
            if (data.page === "myGroups") { //bottom Nav
                this.render();
            }
        });
        PubSub.subscribe("change:view", (data) => {
            if (data.mainPath === "home" && data.subPath === "myGroups") {
                this.render();
            }
        });

        this.cals = store.getState().cals;

        this.eventListeners();
    }

    html() {
        return `
            <div class="content">
                <landing-button-container>
                    <landing-button label="My Calendar" view="home" active></landing-button>
                    <landing-button label="My Groups" view="groupcalendar"></landing-button>
                </landing-button-container>
                <h3>My Groups</h3>
                <div class="container">
                    <div class="box">
                        <img src="" alt="Group image">
                        <div class="groupDetailBox">
                            <h3>Hello world</h3>
                            <p>Detta är beskrivningen på gruppen</p>
                            <p>X antal members</p>
                        </div>
                        <div class="nextEventBox">
                            <h4>Next event</h4>
                            <p>X</p>
                        </div>
                    </div>
                    <div class="box">
                        <img src="" alt="Group image">
                        <div class="groupDetailBox">
                            <h3>Hello world</h3>
                            <p>Detta är beskrivningen på gruppen</p>
                            <p>X antal members</p>
                        </div>
                        <div class="nextEventBox">
                            <h4>Next event</h4>
                            <p>X</p>
                        </div>
                    </div>
                    <div class="box">
                        <img src="" alt="Group image">
                        <div class="groupDetailBox">
                            <h3>Hello world</h3>
                            <p>Detta är beskrivningen på gruppen</p>
                            <p>X antal members</p>
                        </div>
                        <div class="nextEventBox">
                            <h4>Next event</h4>
                            <p>X</p>
                        </div>
                    </div>
                    <div class="box">
                        <img src="" alt="Group image">
                        <div class="groupDetailBox">
                            <h3>Hello world</h3>
                            <p>Detta är beskrivningen på gruppen</p>
                            <p>X antal members</p>
                        </div>
                        <div class="nextEventBox">
                            <h4>Next event</h4>
                            <p>X</p>
                        </div>
                    </div>
                    <div class="box">
                        <img src="" alt="Group image">
                        <div class="groupDetailBox">
                            <h3>Hello world</h3>
                            <p>Detta är beskrivningen på gruppen</p>
                            <p>X antal members</p>
                        </div>
                        <div class="nextEventBox">
                            <h4>Next event</h4>
                            <p>X</p>
                        </div>
                    </div>
                </div>
                <bottom-nav></bottom-nav>
            </div>
        `
    }
    style() {
        return `
        h3 {
            text-align: center;
        }
        .content {
            height: 100%; 
            display: flex;
            flex-direction: column;
        }
        .container {
            display: flex;
            flex-direction: column;
            height: 80%; 
            overflow-y: auto;
            gap: 10px;
        }   
        .box {
            display: flex;
            flex-direction: column;
            background-color: lightgrey;
            padding: 10px;
            border: 1px solid black;
            cursor: pointer;
        }
        .box img {
            background-color: white;
            height: 80px;
        }
    `;
    }

    render() {
        let app = document.getElementById("app");
        let content = this.shadowRoot.innerHTML = `
            <style>
                ${this.style()}
            </style>

             <div class="content">
                <h1>My Groups</h1>
                <div class="container">
                    ${this.html()}
                </div>
            </div>
        `;
        app.innerHTML = content;
    }


    eventListeners() {
        let allCalsBox = document.querySelectorAll(".box");
        for (let calBox of allCalsBox) {
            calBox.addEventListener("click", function () {
                newRouter.navigate(`/home/?id=${calBox.id}`);
            })
        }

    }
}
customElements.define("group-box-comp", GroupContainerBoxComp);
new GroupContainerBoxComp();