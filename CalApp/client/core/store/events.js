
// @ts-check <DO NOT REMOVE>

// Pubsub naming convention
/* Instructions (how to add new):
 *
 * Add a POPUP (view)
 *   1. Add under VIEW.POPUP.SHOW
 *   2. Add under VIEW.POPUP.CLOSE
 *
 * Add a PAGE (view)
 *   1. Add under VIEW.PAGE.SHOW
 *
 * Add a RESOURCE (data)
 *   1.  Add under DATA.UPDATED
 *   2.  Add under DATA.SELECTED
 *   3.  Add under REQUEST.SENT      (POST, GET, PATCH, DELETE)
 *   4.  Add under REQUEST.RECEIVED  (POST, GET)
 *   5.  Add under REQUEST.ERROR     (POST, GET)
 *   6.  Add under RESPONSE.SENT     (POST, GET)
 *   7.  Add under RESPONSE.RECEIVED (POST, GET)
 *   8.  Add under RESPONSE.ERROR    (POST, GET)
 *   9.  Add under RESOURCE.RECEIVED (POST, GET)
 *   10. Add under RESOURCE.ERROR    (POST, GET)
 */


export const EVENTS = {

    // EVENTS.AUTH.LOGIN.START
    // EVENTS.AUTH.LOGOUT.START
    AUTH: {

        LOGIN: {
            START: "auth:login:start",
            SUCCESS: "auth:login:success",
            ERROR: "auth:login:error"
        },

        LOGOUT: {
            START: "auth:logout:start",
            SUCCESS: "auth:logout:success"
        }

    },

    // EVENTS.DATA.UPDATED.CALENDARS
    // EVENTS.DATA.SELECTED.USERS
    DATA: {

        UPDATED: {
            CALENDARS: "data:updated:calendars",
            CALENDARSEVENTS: "data:updated:calendarsevents",
            EVENTS: "data:updated:events",
            USERS: "data:updated:users",
            USERGROUPS: "data:updated:usergroups",
            ISLOGGEDIN: "data:updated:isloggedin",
            MESSAGES: "data:updated:messages"
        },

        SELECTED: {
            CALENDARS: "data:selected:calendars",
            CALENDARSEVENTS: "data:selected:calendarsevents",
            EVENTS: "data:selected:events",
            USERS: "data:selected:users",
            USERGROUPS: "data:selected:usergroups",
            ISLOGGEDIN: "data:selected:isloggedin",
            MESSAGES: "data:selected:messages"
        }

    },

    // EVENTS.VIEW.PAGE.SHOW.HOME
    // EVENTS.VIEW.POPUP.SHOW.CREATEEVENT
    // EVENTS.VIEW.POPUP.CLOSE.CREATEEVENT
    VIEW: {

        PAGE: {
            SHOW: {
                ANY: "view:page:any:show",
                HOME: "view:page:home:show",
                ADD: "view:page:add:show",
                PROFILE: "view:page:profile:show",
                USERS: "view:page:users:show",
                CONTACTS: "view:page:contacts:show",
                CREATEGROUP: "view:page:createGroup:show",
                CREATEEVENT: "view:page:createEvent:show",
                CHAT: "view:page:chat:show",
                MESSAGES: "view:page:messages:show"
            }
        },

        POPUP: {

            SHOW: {
                CREATEGROUP: "view:popup:createGroup:show",
                CREATEEVENT: "view:popup:createEvent:show",
                SEARCHMODAL: "view:popup:searchModal:show",
                CREATEPOPUP: "view:popup:createPopup:show",
                DECICIONPOPUP: "view:popup:decicionPopup:show",
                MESSAGEFEEDPREVIEW: "view:popup:messagefeedpreview:show"
            },

            CLOSE: {
                CREATEGROUP: "view:popup:createGroup:close",
                CREATEEVENT: "view:popup:createEvent:close",
                SEARCHMODAL: "view:popup:searchModal:close",
                CREATEPOPUP: "view:popup:createPopup:close",
                DECICIONPOPUP: "view:popup:decicionPopup:close",
                MESSAGEFEEDPREVIEW: "view:popup:messagefeedpreview:close"
            }

        }

    },

    // EVENTS.REQUEST.SENT.CALENDARS.POST
    // EVENTS.REQUEST.RECEIVED.USERS.GET
    REQUEST: {

        SENT: {
            CALENDARS: {
                POST: "request:sent:calendars:post",
                GET: "request:sent:calendars:get",
                PATCH: "request:sent:calendars:patch",
                DELETE: "request:sent:calendars:delete"
            },
            CALENDARSEVENTS: {
                POST: "request:sent:calendarsevents:post",
                GET: "request:sent:calendarsevents:get",
                PATCH: "request:sent:calendarsevents:patch",
                DELETE: "request:sent:calendarsevents:delete"
            },
            EVENTS: {
                POST: "request:sent:events:post",
                GET: "request:sent:events:get",
                PATCH: "request:sent:events:patch",
                DELETE: "request:sent:events:delete"
            },
            USERS: {
                POST: "request:sent:users:post",
                GET: "request:sent:users:get",
                PATCH: "request:sent:users:patch",
                DELETE: "request:sent:users:delete"
            },
            USERGROUPS: {
                POST: "request:sent:usergroups:post",
                GET: "request:sent:usergroups:get",
                PATCH: "request:sent:usergroups:patch",
                DELETE: "request:sent:usergroups:delete"
            },
            ISLOGGEDIN: {
                POST: "request:sent:isloggedin:post",
                GET: "request:sent:isloggedin:get",
                PATCH: "request:sent:isloggedin:patch",
                DELETE: "request:sent:isloggedin:delete"
            },
            MESSAGES: {
                POST: "request:sent:messages:post",
                GET: "request:sent:messages:get",
                PATCH: "request:sent:messages:patch",
                DELETE: "request:sent:messages:delete"
            }
        },

        RECEIVED: {
            CALENDARS: {
                POST: "request:received:calendars:post",
                GET: "request:received:calendars:get"
            },
            CALENDARSEVENTS: {
                POST: "request:received:calendarsevents:post",
                GET: "request:received:calendarsevents:get"
            },
            EVENTS: {
                POST: "request:received:events:post",
                GET: "request:received:events:get"
            },
            USERS: {
                POST: "request:received:users:post",
                GET: "request:received:users:get"
            },
            USERGROUPS: {
                POST: "request:received:usergroups:post",
                GET: "request:received:usergroups:get"
            },
            ISLOGGEDIN: {
                POST: "request:received:isloggedin:post",
                GET: "request:received:isloggedin:get"
            },
            MESSAGES: {
                POST: "request:received:messages:post",
                GET: "request:received:messages:get"
            }
        },

        ERROR: {
            CALENDARS: {
                POST: "request:error:calendars:post",
                GET: "request:error:calendars:get"
            },
            CALENDARSEVENTS: {
                POST: "request:error:calendarsevents:post",
                GET: "request:error:calendarsevents:get"
            },
            EVENTS: {
                POST: "request:error:events:post",
                GET: "request:error:events:get"
            },
            USERS: {
                POST: "request:error:users:post",
                GET: "request:error:users:get"
            },
            USERGROUPS: {
                POST: "request:error:usergroups:post",
                GET: "request:error:usergroups:get"
            },
            ISLOGGEDIN: {
                POST: "request:error:isloggedin:post",
                GET: "request:error:isloggedin:get"
            },
            MESSAGES: {
                POST: "request:error:messages:post",
                GET: "request:error:messages:get"
            }
        }

    },

    // EVENTS.RESPONSE.RECEIVED.CALENDARS.GET
    RESPONSE: {

        SENT: {
            CALENDARS: {
                POST: "response:sent:calendars:post",
                GET: "response:sent:calendars:get"
            },
            CALENDARSEVENTS: {
                POST: "response:sent:calendarsevents:post",
                GET: "response:sent:calendarsevents:get"
            },
            EVENTS: {
                POST: "response:sent:events:post",
                GET: "response:sent:events:get"
            },
            USERS: {
                POST: "response:sent:users:post",
                GET: "response:sent:users:get"
            },
            USERGROUPS: {
                POST: "response:sent:usergroups:post",
                GET: "response:sent:usergroups:get"
            },
            ISLOGGEDIN: {
                POST: "response:sent:isloggedin:post",
                GET: "response:sent:isloggedin:get"
            },
            MESSAGES: {
                POST: "response:sent:messages:post",
                GET: "response:sent:messages:get"
            }
        },

        RECEIVED: {
            CALENDARS: {
                POST: "response:received:calendars:post",
                GET: "response:received:calendars:get"
            },
            CALENDARSEVENTS: {
                POST: "response:received:calendarsevents:post",
                GET: "response:received:calendarsevents:get"
            },
            EVENTS: {
                POST: "response:received:events:post",
                GET: "response:received:events:get"
            },
            USERS: {
                POST: "response:received:users:post",
                GET: "response:received:users:get"
            },
            USERGROUPS: {
                POST: "response:received:usergroups:post",
                GET: "response:received:usergroups:get"
            },
            ISLOGGEDIN: {
                POST: "response:received:isloggedin:post",
                GET: "response:received:isloggedin:get"
            },
            MESSAGES: {
                POST: "response:received:messages:post",
                GET: "response:received:messages:get"
            }
        },

        ERROR: {
            CALENDARS: {
                POST: "response:error:calendars:post",
                GET: "response:error:calendars:get"
            },
            CALENDARSEVENTS: {
                POST: "response:error:calendarsevents:post",
                GET: "response:error:calendarsevents:get"
            },
            EVENTS: {
                POST: "response:error:events:post",
                GET: "response:error:events:get"
            },
            USERS: {
                POST: "response:error:users:post",
                GET: "response:error:users:get"
            },
            USERGROUPS: {
                POST: "response:error:usergroups:post",
                GET: "response:error:usergroups:get"
            },
            ISLOGGEDIN: {
                POST: "response:error:isloggedin:post",
                GET: "response:error:isloggedin:get"
            },
            MESSAGES: {
                POST: "response:error:messages:post",
                GET: "response:error:messages:get"
            }
        }

    },

    // EVENTS.RESOURCE.RECEIVED.CALENDARS.GET
    RESOURCE: {

        RECEIVED: {
            CALENDARS: {
                POST: "resource:received:calendars:post",
                GET: "resource:received:calendars:get"
            },
            CALENDARSEVENTS: {
                POST: "resource:received:calendarsevents:post",
                GET: "resource:received:calendarsevents:get"
            },
            EVENTS: {
                POST: "resource:received:events:post",
                GET: "resource:received:events:get"
            },
            USERS: {
                POST: "resource:received:users:post",
                GET: "resource:received:users:get"
            },
            USERGROUPS: {
                POST: "resource:received:usergroups:post",
                GET: "resource:received:usergroups:get"
            },
            ISLOGGEDIN: {
                POST: "resource:received:isloggedin:post",
                GET: "resource:received:isloggedin:get"
            },
            MESSAGES: {
                POST: "resource:received:messages:post",
                GET: "resource:received:messages:get"
            }
        },

        ERROR: {
            CALENDARS: {
                POST: "resource:error:calendars:post",
                GET: "resource:error:calendars:get"
            },
            CALENDARSEVENTS: {
                POST: "resource:error:calendarsevents:post",
                GET: "resource:error:calendarsevents:get"
            },
            EVENTS: {
                POST: "resource:error:events:post",
                GET: "resource:error:events:get"
            },
            USERS: {
                POST: "resource:error:users:post",
                GET: "resource:error:users:get"
            },
            USERGROUPS: {
                POST: "resource:error:usergroups:post",
                GET: "resource:error:usergroups:get"
            },
            ISLOGGEDIN: {
                POST: "resource:error:isloggedin:post",
                GET: "resource:error:isloggedin:get"
            },
            MESSAGES: {
                POST: "resource:error:messages:post",
                GET: "resource:error:messages:get"
            }
        }

    }

};



/* OLD (not working with autocomplete, so maybe discontinue this method - under evaluation)

const CRUD_ACTIONS = ["post", "get", "patch", "delete"];
const READ_ACTIONS = ["post", "get"];

const RESOURCES = [
    "calendars",
    "calendarsevents",
    "events",
    "users",
    "usergroups",
    "isloggedin",
    "messages"
];

const POPUPS = [
    "createGroup",
    "createEvent",
    "searchModal",
    "createPopup",
    "decicionPopup",
    "ChatFeedPreview"
];

export const PAGES = [
    "home",
    "add",
    "profile",
    "users",
    "contacts",
    "createGroup",
    "createEvent",
    "chat",
    "messages"
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
    // EVENTS.STATE.LOGIN.START
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

    // Data Events (updated in store, user select resource)
    // EVENTS.STORE.UPDATED.RESOURCE
    STORE: {

        UPDATED: buildStoreUpdatedEvents(),
        SELECTED: buildStoreSelectedEvents()

    },

    // EVENTS.VIRW.PAGE.SHOW 
    // EVENTS.VIRW.POPUP.SHOW
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
    // EVENTS.REQUEST.SENT.RESOURCE.ACTION
    REQUEST: {

        SENT: buildResourcesWithActions("request", "sent", CRUD_ACTIONS),
        RECEIVED: buildResourcesWithActions("request", "received", READ_ACTIONS),
        ERROR: buildResourcesWithActions("request", "error", READ_ACTIONS)

    },

    // API Events
    // EVENTS.RESPONSE.SENT.RESOURCE.ACTION
    RESPONSE: {

        SENT: buildResourcesWithActions("request", "error", READ_ACTIONS),
        RECEIVED: buildResourcesWithActions("response", "received", READ_ACTIONS),
        ERROR: buildResourcesWithActions("response", "error", READ_ACTIONS)

    },

    // API Events
    // EVENTS.RESOURCE.RECEIVED.RESOURCE.ACTION
    RESOURCE: {

        RECEIVED: buildResourcesWithActions("resource", "received", READ_ACTIONS),
        ERROR: buildResourcesWithActions("resource", "error", READ_ACTIONS)

    }

}; */

