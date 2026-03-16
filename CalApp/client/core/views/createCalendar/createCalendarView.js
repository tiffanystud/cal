
import { PubSub } from "../../store/pubsub.js";
import { Store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";
import { calendarService } from "../../services/calendarsService.js";

export class CreateCalendarView {
    
    constructor(root) {
        this.root = root;
    }

    render() {
        
        this.root.innerHTML = `
            <link rel="stylesheet" href="/CalApp/client/core/views/createCalendar/createCalendarView.css">
            <h2>Create new calendar</h2>

            <app-input
                label="Calendar name"
                placeholder="Enter name"
                width="100%"
                id="calName"
            ></app-input>
            
            <app-input
                label="Description"
                placeholder="Enter description of the group"
                width="100%"
                height="100px"
                id="calDesc"
            ></app-input>
            
            <toggle-btn
                inactive-header-text="Make calendar public"
                inactive-info-text="If set to private only invited members will be able to see calendar"
                active-header-text="Make calendar public"
                active-info-text="Calendar is now set to public and will be available to all users"
            ></toggle-btn>
            
            <button id="createBtn">Create</button>
            
        `;
        
        // DOM mst skapas först
        this.addListeners();
    }

    addListeners() {
        
        // + Lägg till ev "view specifika" eventListeners på globala komponenter 
        
        const createBtn = this.root.querySelector("#createBtn");
        
        createBtn.addEventListener("click", () => {
            
            // Membership (in calendar)
            const admins = document.querySelector('add-members[userListName="admins"]').getValue();
            const members = document.querySelector('add-members[userListName="members"]').getValue();
            
            // Create calendar
            const calendarName = document.querySelector("#calName").getValue(); 
            // const creatorId = Store.getState(); // Hämta inloggat id ***
            let typeOfGroup = "private";
            
            const groupType = document.querySelector.querySelector("inactive-header-text");
            if (groupType) { typeOfGroup = "public" }
            
            const calendarPayload = {
                creatorId: "", // Store
                name: calendarName,
                // description: document.querySelector("#calDesc").getValue(), // Finns ej i DB ***
                type: typeOfGroup
            }
            
            const membershipPayload = {
                name: document.querySelector("#calName").getValue(),
                type: typeOfGroup,
                admins: admins,
                members: members
            };
            
            const payload = {
                calendarPayload: calendarPayload,
                membershipPayload: membershipPayload
            }

            PubSub.publish(EVENTS.REQUEST.SENT.CALENDARS.POST, payload);
            
        });
    }
    
    // Lyssna på förändringar i store
    subscribeToStore() {
        
        Store.subscribe("calendarsUpdated", () => {
            
            // Utveckla store
            console.log("Created Calendar")
        })
    }
    
}
