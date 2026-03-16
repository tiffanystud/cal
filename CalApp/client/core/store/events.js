// mall - domain:status:entity:action
// exempel: request:sent:calendars:post

const RESOURCES = [
    "calendars",
    "calendarsevents",
    "events",
    "users",
    "usergroups"
];

const CRUD_ACTIONS = ["post", "get", "patch", "delete"];
const READ_ACTIONS = ["post", "get"];

// Builds all actions for ONE resource.
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


// Builds store update events
// Ex: { CALENDARS: "store:updated:calendars", USERS: "store:updated:users" }
function buildStoreUpdatedEvents() {

    const events = {};

    for (const resource of RESOURCES) {

        const key = resource.toUpperCase();

        events[key] = `store:updated:${resource}`;

    }

    return events;
}


// Ex EVENTS.REQUEST.SENT.CALENDARS.POST > "request:sent:calendars:post"
export const EVENTS = {

    REQUEST: {

        SENT: buildResourcesWithActions(
            "request",
            "sent",
            CRUD_ACTIONS
        ),

        RECEIVED: buildResourcesWithActions(
            "request",
            "received",
            READ_ACTIONS
        ),

        ERROR: buildResourcesWithActions(
            "request",
            "error",
            READ_ACTIONS
        )

    },

    RESPONSE: {

        SENT: buildResourcesWithActions(
            "request",
            "error",
            READ_ACTIONS
        ),

        RECEIVED: buildResourcesWithActions(
            "response",
            "received",
            READ_ACTIONS
        ),

        ERROR: buildResourcesWithActions(
            "response",
            "error",
            READ_ACTIONS
        )

    },

    RESOURCE: {

        RECEIVED: buildResourcesWithActions(
            "resource",
            "received",
            READ_ACTIONS
        ),

        ERROR: buildResourcesWithActions(
            "resource",
            "error",
            READ_ACTIONS
        )

    },

    STORE: {

        UPDATED: buildStoreUpdatedEvents(),

        SELECTED: {
            CALENDARS: "store:selected:calendars"
        }

    }

};