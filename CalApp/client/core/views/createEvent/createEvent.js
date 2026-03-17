import { PubSub } from "../../store/pubsub.js";

export class CreateEvent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode : "open"});
        PubSub.subscribe("change:page", (data) => {
            if(data.page === "add"){ //bottom Nav
                this.render();
            }
        });
        PubSub.subscribe("change:view", (data) => {
            if(data.url.pathname === "/calendars/createEvent"){ //url
                this.render();
            }
        });
    }

    html() {
        return `
        
        <div class="content">
            <h1>Create Event</h1>
            <div class="container">
                <h3>Event name</h3>
                <input>

                <h3>Decription</h3>
                <input>

                <h3>Adress</h3>
                <input>

                <h3>Tags</h3>
                <input>

                <h3>Files</h3>
                <input type="file">

                <h3>Date</h3>
                <input type="date">

                <h3>Estimated time</h3>
                <input type="time">

                <h3>URl(Distance event)</h3>
                <input>

                <button>Create Event</button>

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
            flex-grow: 1; /* Gör att den tar upp all tillgänglig plats */
            overflow-y: auto; /* Aktivera vertikal scrollning */
        }
        button {
            padding: 15px;
            width: 150px;
            margin: 25px 0; 
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
customElements.define("create-event", CreateEvent);
new CreateEvent();