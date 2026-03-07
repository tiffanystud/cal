

// mall - domän:status:entitet:action
// ex. - request:sent:calendars:post

export const EVENTS = {

    REQUEST: {
        SENT: {
            CALENDARS: {
                POST: "request:sent:calendars:post",
                GET:  "request:sent:calendars:get",
                PUT:  "request:sent:calendars:put",
                DELETE: "request:sent:calendars:delete",
            }
        },

        RECEIVED: {
            CALENDARS: {
                POST: "request:received:calendars:post",
                GET:  "request:received:calendars:get",
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
        }
    },

    STORE: {
        UPDATED: {
            CALENDARS: "store:updated:calendars",
        }
    }
};


// events.js

const EVENTS = {
  // Cart-related events
  CART: {
    UPDATED: 'cart/updated',            // Emitted when the cart is updated
    ITEM_ADDED: 'cart/itemAdded',      // Emitted when an item is added to the cart
    ITEM_REMOVED: 'cart/itemRemoved',  // Emitted when an item is removed from the cart
  },

  // User-related events
  USER: {
    LOGGED_IN: 'user/loggedIn',         // Emitted when a user logs in
    LOGGED_OUT: 'user/loggedOut',       // Emitted when a user logs out
    PROFILE_UPDATED: 'user/profileUpdated',  // Emitted when the profile is updated
  },

  // Notification-related events
  NOTIFICATIONS: {
    RECEIVED: 'notifications/received',  // Emitted when a new notification is received
    READ: 'notifications/read',          // Emitted when a notification is read
  },
};

export default EVENTS;