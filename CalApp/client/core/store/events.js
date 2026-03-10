

// mall - domän:status:entitet:action   (ex. request:sent:calendars:post)

export const EVENTS = {

    REQUEST: {
        SENT: {
            CALENDARS: {
                POST: "request:sent:calendars:post",
                GET: "request:sent:calendars:get",
                PATCH: "request:sent:calendars:patch",
                DELETE: "request:sent:calendars:delete",
            },
            CALENDARSEVENTS: {
                POST: "request:sent:calendarsevents:post",
                GET: "request:sent:calendarsevents:get",
                PATCH: "request:sent:calendarsevents:patch",
                DELETE: "request:sent:calendarsevents:delete",
            }
        },

        RECEIVED: {
            CALENDARS: {
                POST: "request:received:calendars:post",
                GET: "request:received:calendars:get",
            },
            CALENDARSEVENTS: {
                POST: "request:received:calendarsevents:post",
                GET: "request:received:calendarsevents:get",
            }
        },

        ERROR: {
            CALENDARS: {
                POST: "request:error:calendars:post",
                GET: "request:error:calendars:get",
            },
            CALENDARSEVENTS: {
                POST: "request:error:calendarsevents:post",
                GET: "request:error:calendarsevents:get",
            }
        }
    },

    RESPONSE: {
        SENT: {
            CALENDARS: {
                POST: "request:error:calendars:post",
                GET: "request:error:calendars:get",
            },
            CALENDARSEVENTS: {
                POST: "request:error:calendarsevents:post",
                GET: "request:error:calendarsevents:get",
            }
        },

        RECEIVED: {
            CALENDARS: {
                POST: "response:received:calendars:post",
                GET: "response:received:calendars:get",
            },
            CALENDARSEVENTS: {
                POST: "response:received:calendarsevents:post",
                GET: "response:received:calendarsevents:get",
            },
            USERS: {
                POST: "response:received:users:post",
                GET: "response:received:users:get",
            }
        },

        ERROR: {
            CALENDARS: {
                POST: "response:error:calendars:post",
                GET: "response:error:calendars:get",
            },
            CALENDARSEVENTS: {
                POST: "response:error:calendarsevents:post",
                GET: "response:error:calendarsevents:get",
            }
        }
    },

    RESOURCE: {
        RECEIVED: {

            USERS: {
                POST: "resource:received:users:post",
                GET: "resource:received:users:get",
            },

            CALENDARS: {
                POST: "resource:received:calendars:post",
                GET: "resource:received:calendars:get",
            },

            CALENDARSEVENTS: {
                POST: "resource:received:calendarsevents:post",
                GET: "resource:received:calendarsevents:get",
            }
        },

        ERROR: {
            CALENDARS: {
                POST: "resource:error:calendars:post",
                GET: "resource:error:calendars:get",
            },
            CALENDARSEVENTS: {
                POST: "resource:error:calendarsevents:post",
                GET: "resource:error:calendarsevents:get",
            }
        }
    },

    STORE: {
        UPDATED: {
            CALENDARS: "store:updated:calendars",
            CALENDARSEVENTS: "store:updated:calendarsevents",
        },
        SELECTED: {
            CALENDARS: "store:selected:calendar"
        }
    },
};
