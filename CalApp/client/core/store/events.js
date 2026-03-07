

// mall - domän:status:entitet:action   (ex. request:sent:calendars:post)

export const EVENTS = {

    REQUEST: {
        SENT: {
            CALENDARS: {
                POST: "request:sent:calendars:post",
                GET:  "request:sent:calendars:get",
                PATCH:  "request:sent:calendars:patch",
                DELETE: "request:sent:calendars:delete",
            }
        },

        RECEIVED: {
            CALENDARS: {
                POST: "request:received:calendars:post",
                GET:  "request:received:calendars:get",
            }
        },
        
        ERROR: {
            CALENDARS: {
                POST: "request:error:calendars:post",
                GET:  "request:error:calendars:get",
            }
        }
    },

    RESPONSE: {
        SENT: {
            CALENDARS: {
                POST: "response:sent:calendars:post",
                GET:  "response:sent:calendars:get",
            }
        },

        RECEIVED: {
            CALENDARS: {
                POST: "response:received:calendars:post",
                GET:  "response:received:calendars:get",
            },
            USERS: {
                POST: "response:received:users:post",
                GET:  "response:received:users:get",
            }
        },

        ERROR: {
            CALENDARS: {
                POST: "response:error:calendars:post",
                GET:  "response:error:calendars:get",
            }
        }
    },

    RESOURCE: {
        RECEIVED: {
            
            USERS: {
                POST: "resource:received:users:post",
                GET:  "resource:received:users:get",
            },
            
            CALENDARS: {
                POST: "resource:received:calendars:post",
                GET:  "resource:received:calendars:get",
            },
            
            EVENTS: {
                POST: "resource:received:events:post",
                GET:  "resource:received:events:get",
            }
        }, 
        
        ERROR: {
            CALENDARS: {
                POST: "resource:error:calendars:post",
                GET:  "resource:error:calendars:get",
            }
        }
    },

    STORE: {
        UPDATED: {
            CALENDARS: "store:updated:calendars",
        }
    }
};
