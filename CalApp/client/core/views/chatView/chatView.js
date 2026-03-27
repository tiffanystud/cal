import { store } from "../../store/store.js";
import { PubSub } from "../../store/pubsub.js";


export class ChatView extends HTMLElement {
    constructor() {
        super();
        this.state;
        this.attachShadow({ mode: "open" });
        PubSub.subscribe("change:page", (data) => {
            console.log("SUB FIRED", data);
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
        <div id="messageContainer"></div>
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
    something(myId, calId,state) { //only cal id for now
        let messageContainer = document.getElementById("messageContainer");

        for(let calmess of state.calendarMessages) {
            console.log(calmess);
            let messageBox = document.createElement("message-box");
            messageBox.message = calmess;
            if(calmess.senderId === myId) {
                console.log("my mess")
                messageBox.users = {
                    sender: myId,
                    receiver: calId
                }
                messageBox.alignRight = true;      

            } else {
                console.log("Other")

                messageBox.users = {
                    sender: calmess.senderId,
                    receiver: calId
                }

            } 
            messageContainer.appendChild(messageBox)
        }

        
        /*
        let messages = [
            {
                content: "Hej!",
                date: "2026-03-27",
                time: "14:30",
                senderId: myId
            },
            {
                content: "Tja!",
                date: "2026-03-27",
                time: "14:31",
                senderId: friendId
            }
        ];
        */
        


        

    }
    

}

customElements.define("chat-view", ChatView)

new ChatView();

