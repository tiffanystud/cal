
export const state = {

    isLoggedIn: {
        id: "65e10aa11a001",
        username: "Elias",
        email: "Elias@mau.se"
    },

    pages: {
        currentPage: "",
    },

    currentContext: {
        currentCal: {},
        currentEvents: []
    },

    userData: {

        cals: [{
            id: 1,
            creatorId: 2,
            name: "VIP",
            type: "public"
        }, {
            id: 2,
            creatorId: 2,
            name: "TEST",
            type: "public"
        }],

        usergroups: [
            {
                "id": "65e10aa11d001",
                "userId": "65e10aa11a001",
                "calId": "65e10aa11b001",
                "isAdmin": true
            }
        ],

        events: [{
            id: 1,
            date: "2026-03-05",
            type: "AW",
            name: "Inflyttningsfest",
            description: "Inflyttningsfest hos Elias",
            location: "Västra hamnen",
            calId: 1,
            groupId: 1
        }, {
            id: 2,
            date: "2026-03-05",
            type: "AW",
            name: "Hej",
            description: "Inflyttningsfest hos Elias",
            location: "Västra hamnen",
            calId: 1,
            groupId: 1
        }, {
            id: 1,
            date: "2025-01-06",
            type: "AW",
            name: "hej",
            description: "Omg",
            location: "Svalöv",
            calId: 1,
            groupId: 1
        }],

        friends: [{
            id: 1,
            userID1: 1,
            userID2: 2
        }],

        privateMessages: [{
            id: 1,
            senderId: 2,
            reciverId: 1,
            date: "2026-03-05",
            time: "15:15",
            content: "Plugga nu",
            hasChanged: false
        }],

        calendarMessages: [{
            id: 1,
            senderId: 2,
            calId: 1,
            date: "2026-03-05",
            time: "15:15",
            content: "Plugga nu",
            hasChanged: false
        }],

        userPinnedCalendars: [{
            id: 1,
            userId: 1,
            calId: 1
        }],

        availabilites: [{
            id: 1,
            userId: 1,
            date: "2026-03-05",
            isAvailable: true,
            calId: 1
        }],

        notis: []
    }

}