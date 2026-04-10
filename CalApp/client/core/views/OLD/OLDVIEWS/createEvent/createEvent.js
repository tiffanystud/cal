import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";
import {store} from "../../store/store.js";
import { apiRequest } from "../../services/api.js";

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
            if(data.mainPath === "home" && data.subPath === "create"){ //url
                this.render();
            }
        });
                  
        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.CREATEEVENT, () => {
            this.render();
        })
        
    }
    render() {
        let content = document.getElementById("content");
        content.innerHTML = `
        <style>
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
        </style>

        <div class="content">
            <h1>Create Event</h1>
            <div class="container">
                <h3>Select calender</h3>
                <input placeholder="Select" list="calendars">
                <datalist id="calendars">
        
                </datalist>

                <h3>Event name</h3>
                <input id="name">

                <h3>Decription</h3>
                <input id="dec">

                <h3>Adress</h3>
                <input id="adress">

                <h3>Tags</h3>
                <input id="tags">
                
                <h3>Type</h3>
                <input id="type">

                <h3>Date</h3>
                <input id="date" type="date">

                <h3>Estimated time</h3>
                <input id="time" type="time">

                <h3>Max participants</h3>
                <input id="maxParti" type="number">

                <h3>Need confirmation from participants?</h3>
                <div>
                    <input type="radio" id="yes" name="participants" value="yes">
                    <label for="yes">Yes</label>
                    <input type="radio" id="no" name="participants" value="no">
                    <label for="no">No</label>
                </div>
                <button id="createEventBtn">Create Event</button>

            </div>
        </div> 
        `
        this.getAllCals();
        const createEventBtn = document.getElementById("createEventBtn");
        createEventBtn.addEventListener("click", () => {
            this.createEvent();
        })

    }
    getAllCals() {
        const getCurrentStateCals = store.getState().cals;
        let dataListCals = document.getElementById("calendars");
        for(let cal of getCurrentStateCals) {
            if(typeof(cal) === "object" && "id" in cal) { // Några kalender var en tom array?
                const option = document.createElement("option");
                option.value = cal.name;
                option.setAttribute("data-id", cal.id);
                dataListCals.appendChild(option);
            }
        }
    }
    async createEvent() {
        let calId;
        const selectedCal = document.querySelector('input[list="calendars"]').value;
        const selectedOptionCal = [...document.querySelectorAll('#calendars option')].find(
            option => option.value === selectedCal
        );
        if(!selectedOptionCal) {
            calId = null
        } else {
            calId = selectedOptionCal.getAttribute("data-id");
        }
        let confirmation;
        const selectedOptionRadio = document.querySelector('input[name="participants"]:checked');
        if(!selectedOptionRadio) {
            confirmation = null;
        } else {
            const selectCon = selectedOptionRadio.value;
            confirmation = selectCon === null || selectCon === "no" ? false : true;
        }
        const name = document.getElementById("name").value;
        const dec = document.getElementById("dec").value;
        const adress = document.getElementById("adress").value;
        const tags = document.getElementById("tags").value;
        const type = document.getElementById("type").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const maxParti = document.getElementById("maxParti").value;
        
        
        if((calId === null) || (name === "") || (adress === "") || (time === "")){
            console.log("cal,name,time or adress missing")

        } else {
            const sendObj = {
                entity: "events",
                method: "POST",
                body: {
                    date: date,
                    time: time,
                    type: type,
                    name: name,
                    description: dec,
                    location: adress,
                    needsConfirmation: confirmation,
                    participationLimits: maxParti,
                    tags: tags,
                    calId: calId
    
                }
            }
            try {
                let data = await apiRequest(sendObj);
                if(typeof(data) === "object") {
                    store.setState({
                        events: [
                            ...store.getState().events, 
                            data 
                        ]
                    });
                    const allInputs = document.querySelectorAll("input");
                    for(let input of allInputs) {
                        input.value = "";
                    }
                }
            } catch(error) {
                console.error("Error adding event:", error);
            }
        }
        
    }
}
customElements.define("create-event", CreateEvent);
new CreateEvent();