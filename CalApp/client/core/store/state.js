

export const State = {

    isLoggedIn: {
        id: "",
        username: "",
        email: ""
    },

    cals: [],

    usercalendars: [],

    events: [],

    friends: [],

    privateMessages: [],

    calendarMessages: [],

    userPinnedCalendars: [],

    availabilites: [],

    notis: []

};


// Same as above, but cleaner structure when in use in store.js
export const StateSchema = {
    isLoggedIn: {
        id: "",
        username: "",
        email: ""
    },
    cals: [],
    usergroups: [],
    events: [],
    friends: [],
    privateMessages: [],
    calendarMessages: [],
    userPinnedCalendars: [],
    availabilities: [],
    notis: []
};



