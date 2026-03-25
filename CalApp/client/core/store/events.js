const CRUD_ACTIONS = ["post", "get", "patch", "delete"];
const READ_ACTIONS = ["post", "get"];

const RESOURCES = [
    "calendars",
    "calendarsevents",
    "events",
    "users",
    "usergroups",
    "isloggedin"
];

const POPUPS = [
    "createGroup",
    "createEvent",
    "searchModal",
    "createPopup",
    'decicionPopup'
];

export const PAGES = [
    "home",
    "add",
    "profile",
    "users",
    "contacts",
    "createGroup",
    "createEvent"
];


// Builds all actions for ONE resource
// Ex: { POST: "request:sent:calendars:post", GET: "request:sent:calendars:get" }
function buildEventActionsForResource(domain, status, resource, actions) {

    const events = {};

    for (const action of actions) {

        const key = action.toUpperCase();
        events[key] = `${domain}:${status}:${resource}:${action}`;
    }

    return events;
}


// Builds the EVENTS whole resource level (CALENDARS, USERS etc).
// Ex: { CALENDARS: { POST: "request:sent:calendars:post" }, USERS: {...} }
function buildResourcesWithActions(domain, status, actions) {

    const resources = {};

    for (const resource of RESOURCES) {

        const key = resource.toUpperCase();
        resources[key] =
            buildEventActionsForResource(
                domain,
                status,
                resource,
                actions
            );

    }

    return resources;
}

// Use after store.setState() / store.resetState(), when new data
// Ex: { CALENDARS: "store:updated:calendars", USERS: "store:updated:users" }
function buildStoreUpdatedEvents() {

    const events = {};

    for (const resource of RESOURCES) {

        const key = resource.toUpperCase();
        events[key] = `store:updated:${resource}`;

    }

    return events;
}

// Use when the user selects a resource in the UI. Ex. "click on a event"
// Ex: { store:selected:events" ) or { "store:selected:users" }
// Vilken del av store användaren jobbar med just nu, vilken resurs är 'active' just nu
function buildStoreSelectedEvents() {
    const events = {};

    for (const resource of RESOURCES) {
        const key = resource.toUpperCase();
        events[key] = `store:selected:${resource}`;
    }

    return events;
}


function buildPopupShowEvents() {
    
    const events = {};

    for (const popup of POPUPS) {
        const key = popup.toUpperCase();
        events[key] = `view:popup:${popup}:show`;
    }

    return events;
}

function buildPopupCloseEvents() {
    
    const events = {};

    for (const popup of POPUPS) {
        const key = popup.toUpperCase();
        events[key] = `view:popup:${popup}:close`;
    }

    return events;
}

function buildPageShowEvents() {
    const events = {};

    for (const page of PAGES) {
        const key = page.toUpperCase();
        events[key] = `view:page:${page}:show`;
    }

    return events;
}

export const EVENTS = {

    // Sysem Events (login/logout)
    STATE: {

        LOGIN: {
            START: "state:login:start",
            SUCCESS: "state:login:success",
            ERROR: "state:login:error"
        },

        LOGOUT: {
            START: "state:logout:start",
            SUCCESS: "state:logout:success"
        }
    },

    // Data Events (updated data, user selected a resource)
    STORE: {
        
        UPDATED: buildStoreUpdatedEvents(),
        SELECTED: buildStoreSelectedEvents()
   
    },
    
    // UI Events
    VIEW: {
            
        PAGE: {
            
            SHOW: buildPageShowEvents(),
            
        },
        
        POPUP: {
            
            SHOW: buildPopupShowEvents(),
            CLOSE: buildPopupCloseEvents()
            
        }
            
    },

    // API Events
    REQUEST: {

        SENT: buildResourcesWithActions("request", "sent", CRUD_ACTIONS),
        RECEIVED: buildResourcesWithActions("request", "received", READ_ACTIONS),
        ERROR: buildResourcesWithActions("request", "error", READ_ACTIONS)

    },
    
    // API Events
    RESPONSE: {

        SENT: buildResourcesWithActions("request", "error", READ_ACTIONS),
        RECEIVED: buildResourcesWithActions("response", "received", READ_ACTIONS),
        ERROR: buildResourcesWithActions("response", "error", READ_ACTIONS)

    },
    
    // API Events
    RESOURCE: {

        RECEIVED: buildResourcesWithActions( "resource", "received", READ_ACTIONS ),
        ERROR: buildResourcesWithActions("resource", "error", READ_ACTIONS )

    }

};