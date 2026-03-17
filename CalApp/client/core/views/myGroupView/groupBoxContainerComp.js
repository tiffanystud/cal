import { PubSub } from "../../store/pubsub.js";

export class GroupContainerBoxComp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode : "open"});
        PubSub.subscribe("change:page", (data) => {
            if(data.page === "myGroups"){ //bottom Nav
                this.render();
            }
        });
        PubSub.subscribe("change:view", (data) => {
            if(data.url.pathname === "/home/myGroups"){ 
                this.render();
            }
        });

        
        this.render();
    }
    html() {
        return `
            <div class="content">
                <h1>My Groups</h1>
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
        h1 {
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
        }
        .box img {
            background-color: yellow;
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
            ${this.html()}
        `;
        app.innerHTML = content;
    }
}
customElements.define("group-box-comp", GroupContainerBoxComp);
new GroupContainerBoxComp();