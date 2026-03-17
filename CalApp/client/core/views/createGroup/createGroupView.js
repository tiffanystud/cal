
import { PubSub } from "../../store/pubsub.js";
import { Store } from "../../store/store.js";
import { EVENTS } from "../../store/events.js";
// import { CalendarService } from "../../services/calendarsService.js";

export class CreateCalendarView {
    
    constructor() {
        this.app = document.querySelector("#app");
        this.subs();
    }

    subs() {
        console.log("SUBSCRIBE IN CALS")
        
        PubSub.subscribe("change:view", (data) => {
            if (data.mainPath == "createGroup") {
                this.render();
            }
            if (data.mainPath == "home/createGroup") {
                this.render();
            }
        })
    }
    
    render() {
        
        this.app.innerHTML = `
            <link rel="stylesheet" href="/core/views/createGroup/createGroupView.css">
            
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
            
            <search-users-modal></search-users-modal>

            <add-members 
                titleElem="Add Admins" 
                userListName="admins">
            </add-members>
            
            <add-members 
                titleElem="Add Members"
                userListName="members">
            </add-members>
            
            <button id="createBtn">Create</button>
            
        `;
        
        // DOM mst skapas först
        this.addListeners();
    }

    addListeners() {
        
        // + Lägg till ev "view specifika" eventListeners på globala komponenter 
        
        const createBtn = this.app.querySelector("#createBtn");
        
        createBtn.addEventListener("click", () => {
            
            // Membership (in calendar)
            const admins = document.querySelector('add-members[userListName="admins"]').getValue();
            const members = document.querySelector('add-members[userListName="members"]').getValue();
            
            console.log("HEEEEEEEJ" + admins);
            let value = "private";
            
            const groupType = document.querySelector("inactive-header-text");
            if (groupType) {
                value = "public"
            }
            
            const payload = {
                calendarPayload: calendarPayload,
                membershipPayload: membershipPayload
            }
            
            // Listener?
            
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

new CreateCalendarView();