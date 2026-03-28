
import { PubSub } from "../../store/pubsub.js";
import { EVENTS } from "../../store/events.js";
import { store } from "../../store/store.js";

export class CreateCalendarView {

    constructor() {

        this.app = document.querySelector("#app");
        this.subs();

    }

    subs() {

        PubSub.subscribe("change:view", (data) => {
            if (data.mainPath == "createGroup") {
                this.render();
            }
            if (data.mainPath == "home/createGroup") {
                this.render();
            }
            if (data.mainPath == "calendars/createGroup") {
                this.render();
            }
        })

        PubSub.subscribe(EVENTS.VIEW.POPUP.SHOW.CREATEGROUP, () => {
            this.render();
        })

    }

    render() {

        this.app.innerHTML = `
            <link rel="stylesheet" href="/core/views/createGroup/createGroupView.css">
                    
            <h2>Create new calendar</h2>

            <app-input
                label="Calendar Name"
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
            
            <search-users-modal-test></search-users-modal-test>

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

        this.addListeners();
    }

    addListeners() {

        const createBtn = this.app.querySelector("#createBtn");

        // Create calendar 
        createBtn.addEventListener("click", () => {

            const state = store.getState();
            const toggleStatus = document.querySelector("toggle-btn").getValue()
            const groupNameInput = document.querySelector('app-input[label="Calendar Name"]');
            const descriptionInput = document.querySelector('app-input[label="Description"]');

            // Calendar
            const currGroupName = groupNameInput.getValue() || "Group";
            const currDescription = descriptionInput.getValue() || "";
            const currCreatorId = state.isLoggedIn.id;
            const currGroupType = toggleStatus === "active" ? "private" : "public";

            // Memberships / userGroups
            const addedAdmins = document.querySelector('add-members[userListName="admins"]').getValue();
            const addedMembers = document.querySelector('add-members[userListName="members"]').getValue();

            const payload = {

                calendarPayload: {
                    creatorId: currCreatorId,
                    name: currGroupName,
                    description: currDescription,
                    type: currGroupType
                },
                membershipPayload: {
                    admins: addedAdmins,
                    members: addedMembers
                }

            }

            // PUBLISH LISTENER (SENT)
            PubSub.publish(EVENTS.REQUEST.SENT.CALENDARS.POST, payload, true);

        });
    }

    // Lyssna på förändringar i store
    subscribeToStore() {

        store.subscribe(EVENTS.DATA.UPDATED.CALENDARS, () => {
            // FOR FURTHER DEVELOPMENT
        })
        
        
    }

}

new CreateCalendarView();