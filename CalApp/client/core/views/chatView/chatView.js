import { store } from "../../store/store.js";
import { PubSub } from "../../store/pubsub.js";
import { apiRequest } from "../../services/api.js";


export class ChatView extends HTMLElement {
    constructor() {
        super();
        this.state;
        this.attachShadow({ mode: "open" });
        
        PubSub.subscribe("change:page", (data) => {
            console.log("C:P SUB FIRED", data);
            if (data.page === "chat") {
                this.render();
            }

        });
        
        PubSub.subscribe("change:view", (data) => {

            if (data.mainPath === "home" && data.subPath === "chat") {
                this.render();
            }

        });

       
    }
    

       

    

    render() {
        let content = document.querySelector("#content");
        let state = store.getState();

        content.innerHTML = `
        <style>
            #data {
                background: grey;
                padding: 5px;

            }
        </style>
        <h2>Chats</h2>
        <app-input id="searchBar" placeholder="Type calender or a friend to chat"></app-input>
        <div id="data"></div>
    `
    const searchBar = content.querySelector("#searchBar");
    let dataDiv = content.querySelector("#data");

    //let allEvents = state.events; //[{name}]
    let allCals = state.cals; //[{name}]
    let allFriends = state.friends;
    
    let allDataWithType = [];

    // Events
    /*
    for (let event of allEvents) {
        if (event.name) {
            allDataWithType.push({
                name: event.name,
                type: "event"
            });
        }
    }
    */
    

    // Calendars
    for (let cal of allCals) {
        if (cal.name) {
            allDataWithType.push({
                name: cal.name,
                type: "calendar",
                id: cal.id
            });
        }
    }

    // Friends
    for (let friend of allFriends) {
        if (friend.name) {
            allDataWithType.push({
                name: friend.name,
                type: "friend",
            });
        }
    }


    searchBar.addEventListener("input", () => {
        let messageContainer = document.getElementById("messageContainer");
        messageContainer.innerHTML = "";
        dataDiv.innerHTML = "";

        let valueInput = searchBar.getValue().toLowerCase();
        if (valueInput.length > 1) {
            for (let data of allDataWithType) {
                if (data.name.toLowerCase().includes(valueInput)) {
                    const divContainer = document.createElement("div");
                    divContainer.style.background = "white";
                    divContainer.style.padding = "5px";
                    divContainer.style.borderBottom = "1px solid black";
                    const div = document.createElement("div");
                    div.style.display = "flex";
                    div.style.justifyContent = "space-between";
                    const pName = document.createElement("p");
                    pName.textContent = data.name[0].toUpperCase() + data.name.slice(1).toLowerCase();
                    const pType = document.createElement("p");
                    pType.textContent = data.type[0].toUpperCase() + data.type.slice(1).toLowerCase();
                    div.appendChild(pName);
                    div.appendChild(pType);
                    divContainer.appendChild(div);
                    divContainer.addEventListener("click" , () => {
                        this.something(state.isLoggedIn.id, data.id,state )
                    })
                    dataDiv.appendChild(divContainer);
                    
                }
            }
        }

    


        
        
    })}
    

}

customElements.define("chat-view", ChatView)

new ChatView();

