export const state = {

    isLoggedIn: { id: 1, username: "Elias", email: "Elias@mau.se" },

    pages: {
        currentPage: "",
    },

    data: {
        cals: [{ id: 1, creatorId: 2, name: "VIP", type: "public" }],

        events: [{ id: 1, date: "2026-03-05", type: "AW", name: "Inflyttningsfest", description: "Inflyttningsfest hos Elias", location: "Västra hamnen", calId: 1 }],

        friends: [{ id: 1, userID1: 1, userID2: 2 }],

        privateMessages: [{ id: 1, senderId: 2, reciverId: 1, date: "2026-03-05", time: "15:15", content: "Plugga nu", hasChanged: false }],

        calendarMessages: [{ id: 1, senderId: 2, calId: 1, date: "2026-03-05", time: "15:15", content: "Plugga nu", hasChanged: false }],

        userPinnedCalendars: [{ id: 1, userId: 1, calId: 1 }],

        availabilites: [{ id: 1, userId: 1, date: "2026-03-05", isAvailable: true, calId: 1 }]
    }

}