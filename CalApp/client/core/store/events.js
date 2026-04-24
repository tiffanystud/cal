
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
 *   1.  Add under DATA.RETURNEDF
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
            TEST: "data:updated:test",
            CALENDARS: "data:updated:calendars",
            CALENDARSEVENTS: "data:updated:calendarsevents",
            EVENTS: "data:updated:events",
            USERS: "data:updated:users",
            USERSCALENDARS: "data:updated:userscalendars",
            ISLOGGEDIN: "data:updated:isloggedin",
            MESSAGES: "data:updated:messages",
        },

        RETURNED: {
            MESSAGES: "data:returned:messages",
            EVENTSRSVP: "data:selected:eventsrsvp",
            TEST: "data:returned:test",
            CALENDARS: "data:returned:calendars",
            USERS: "data:returned:users",
            EVENTS: "data:returned:events",
            USERSCALENDARS: "data:returned:userscalendars",
            NOTIFICATIONS: "data:returned:notifications",
            PRIVATE_MSG: "data:returned:private_msg",
            CALENDAR_MSG: "data:returned:calendar_msg",
            SEARCHMOAL: "data:returned:searchmodal",
        },

        SELECTED: {
            TEST: "data:updated:test",
            CALENDARS: "data:selected:calendars",
            CALENDARSEVENTS: "data:selected:calendarsevents",
            USERSCALENDARS: "data:selected:userscalendars",
            EVENTS: "data:selected:events",
            USERS: "data:selected:users",
            ISLOGGEDIN: "data:selected:isloggedin",
            MESSAGES: "data:selected:messages",
            EVENTSRSVP: "data:selected:eventsrsvp",
            NOTIFICATIONS: "data:selected:notifications",
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
                DECISIONPOPUP: "view:popup:decisionpopup:show",
                MESSAGEFEEDPREVIEW: "view:popup:messagefeedpreview:show",
                TEST1: "view:popup:test1:show",
                TEST2: "view:popup:test2:show"
            },

            CLOSED: {
                CREATEGROUP: "view:popup:createGroup:closed",
                CREATEEVENT: "view:popup:createEvent:closed",
                SEARCHMODAL: "view:popup:searchModal:closed",
                CREATEPOPUP: "view:popup:createPopup:closed",
                DECISIONPOPUP: "view:popup:decisionpopup:closed",
                MESSAGEFEEDPREVIEW: "view:popup:messagefeedpreview:closed",
                TEST1: "view:popup:test1:closed",
                TEST2: "view:popup:test2:closed"
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
            NOTIFICATIONS: {
                POST: "request:sent:notifications:post",
                GET: "request:sent:notifications:get",
                PATCH: "request:sent:notifications:patch",
                DELETE: "request:sent:notifications:delete"
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
            USERSCALENDARS: {
                POST: "request:sent:userscalendars:post",
                GET: "request:sent:userscalendars:get",
                PATCH: "request:sent:userscalendars:patch",
                DELETE: "request:sent:userscalendars:delete"
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
            USERSCALENDARS: {
                POST: "request:received:userscalendars:post",
                GET: "request:received:userscalendars:get"
            },
            ISLOGGEDIN: {
                POST: "request:received:isloggedin:post",
                GET: "request:received:isloggedin:get"
            },
            MESSAGES: {
                POST: "request:received:messages:post",
                GET: "request:received:messages:get"
            },
            NOTIFICATIONS: {
                POST: "request:received:notifications:post",
                GET: "request:received:notifications:get",
                PATCH: "request:received:notifications:patch",
                DELETE: "request:received:notifications:delete"
            },
        },

        ERROR: {
            CALENDARS: {
                POST: "request:error:calendars:post",
                GET: "request:error:calendars:get",
                PATCH: "request:error:calendars:patch",
                DELETE: "request:error:calendars:delete"
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
            USERSCALENDARS: {
                POST: "request:error:userscalendars:post",
                GET: "request:error:userscalendars:get"
            },
            ISLOGGEDIN: {
                POST: "request:error:isloggedin:post",
                GET: "request:error:isloggedin:get"
            },
            MESSAGES: {
                POST: "request:error:messages:post",
                GET: "request:error:messages:get"
            },
            NOTIFICATIONS: {
                POST: "request:error:notifications:post",
                GET: "request:error:notifications:get",
                PATCH: "request:error:notifications:patch",
                DELETE: "request:error:notifications:delete",
            }
        }

    },

    // EVENTS.RESPONSE.RECEIVED.CALENDARS.GET
    RESPONSE: {

        SENT: {
            CALENDARS: {
                POST: "response:sent:calendars:post",
                GET: "response:sent:calendars:get",
                PATCH: "response:sent:calendars:patch",
                DELETE: "response:sent:calendars:delete"
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
            USERSCALENDARS: {
                POST: "response:sent:userscalendars:post",
                GET: "response:sent:userscalendars:get"
            },
            ISLOGGEDIN: {
                POST: "response:sent:isloggedin:post",
                GET: "response:sent:isloggedin:get"
            },
            MESSAGES: {
                POST: "response:sent:messages:post",
                GET: "response:sent:messages:get"
            },
            NOTIFICATIONS: {
                POST: "response:sent:notifications:post",
                GET: "response:sent:notifications:get",
                PATCH: "response:sent:notifications:patch",
                DELETE: "response:sent:notifications:delete"
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
            USERSCALENDARS: {
                POST: "response:received:userscalendars:post",
                GET: "response:received:userscalendars:get"
            },
            ISLOGGEDIN: {
                POST: "response:received:isloggedin:post",
                GET: "response:received:isloggedin:get"
            },
            MESSAGES: {
                POST: "response:received:messages:post",
                GET: "response:received:messages:get"
            },
            NOTIFICATIONS: {
                POST: "response:received:notifications:post",
                GET: "response:received:notifications:get",
                PATCH: "response:received:notifications:patch",
                DELETE: "response:received:notifications:delete",
            },
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
                GET: "response:error:events:get",
                PATCH: "response:error:events:patch",
                DELETE: "response:error:events:delete"
            },
            USERS: {
                POST: "response:error:users:post",
                GET: "response:error:users:get"
            },
            USERSCALENDARS: {
                POST: "response:error:userscalendars:post",
                GET: "response:error:userscalendars:get"
            },
            ISLOGGEDIN: {
                POST: "response:error:isloggedin:post",
                GET: "response:error:isloggedin:get"
            },
            MESSAGES: {
                POST: "response:error:messages:post",
                GET: "response:error:messages:get"
            },
            NOTIFICATIONS: {
                POST: "response:error:notifications:post",
                GET: "response:error:notifications:get",
                PATCH: "response:error:notifications:patch",
                DELETE: "response:error:notifications:delete",
            },

        }

    },

    // EVENTS.RESOURCE.RECEIVED.CALENDARS.GET
    RESOURCE: {

        RECEIVED: {
            CALENDARS: {
                POST: "resource:received:calendars:post",
                GET: "resource:received:calendars:get",
                PATCH: "resource:received:calendars:patch",
                DELETE: "resource:received:calendars:delete"
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
            USERSCALENDARS: {
                POST: "resource:received:userscalendars:post",
                GET: "resource:received:userscalendars:get"
            },
            ISLOGGEDIN: {
                POST: "resource:received:isloggedin:post",
                GET: "resource:received:isloggedin:get"
            },
            MESSAGES: {
                POST: "resource:received:messages:post",
                GET: "resource:received:messages:get"
            },
            NOTIFICATIONS: {
                POST: "resource:received:notifications:post",
                GET: "resource:received:notifications:get",
                PATCH: "resource:received:notifications:patch",
                DELETE: "resource:received:notifications:delete"
            },
        },

        ERROR: {
            CALENDARS: {
                GET: "resource:error:calendars:get",
                POST: "resource:error:calendars:post",
                PATCH: "resource:error:calendars:patch",
                DELETE: "resource:error:calendars:delete"
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
            USERSCALENDARS: {
                POST: "resource:error:userscalendars:post",
                GET: "resource:error:userscalendars:get"
            },
            ISLOGGEDIN: {
                POST: "resource:error:isloggedin:post",
                GET: "resource:error:isloggedin:get"
            },
            MESSAGES: {
                POST: "resource:error:messages:post",
                GET: "resource:error:messages:get"
            },
            NOTIFICATIONS: {
                POST: "resource:error:notifications:post",
                GET: "resource:error:notifications:get",
                PATCH: "resource:error:notifications:patch",
                DELETE: "resource:error:notifications:delete"
            },
        }

    }

};
