// Tiffny

import { PubSub } from "../../store/pubsub.js";
import { storeObj } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";

export class CreateCalendarView {
    
    constructor(root) {
        this.root = root;
    }

    render() {
        this.root.innerHTML = `
            <h2>Create new calendar</h2>

            <app-input
                label="Calendar name"
                placeholder="Enter name"
                width="100%"
                id="calName"
            ></app-input>

            <app-input
                label="Description"
                placeholder="Enter description"
                width="100%"
                id="calDesc"
            ></app-input>

            <button id="createBtn">Create</button>
        `;

        this.addListeners();
    }

    addListeners() {
        
        const createBtn = this.root.querySelector("#createBtn");

        createBtn.addEventListener("click", () => {
            const nameInputContainer = this.root.querySelector("#calName").getValue();
            const descInputContainer = this.root.querySelector("#calDesc").getValue();
            
            const payload = {
                creatorId: "",
                description: "",
                type: ""
            }
            
            // PubSub ... payload
        });
    }
    
    subscribeToStore() {
        storeObj.subscribe("calendarsUpdated", () => {
            
            // Utveckla store
            console.log("Created Calendar")
        })
    }
    
}












/* 

    Varje view bestämmer vilka events som är relevanta för viewns komponenter. Komponenterna kopplas ej till store själva. 
    store.subscribe("groupsUppdated"), () => {
        this.groupListComponent.update(store.getState().data.groups);
    }
    
    store.subscribe("groupsUppdated"), () => {
        this.groupListComponent.update();
    }
   
    -- 
    
    Komponent: 

    update(groups) {
        this.groups = groups;
        this.render;
    }
*/