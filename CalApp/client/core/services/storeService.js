import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";
import { EVENTS } from "../store/events.js";


export class StoreService {

    constructor() {

        PubSub.subscribe(EVENTS.STATE.LOGIN.START, async (payload) => {

            const userId = payload.userId;

            try {

                // Get User
                const currUser = await apiRequest({
                    entity: `users?id=${userId}`,
                    method: "GET"
                });

                if (!currUser) {
                    console.error("No user returned from API");
                    return;
                }

                store.setState({
                    isLoggedIn: {
                        id: currUser.id,
                        username: currUser.name,
                        email: currUser.email
                    }
                });

                // Get UGs
                let usergroups;

                try {
                    usergroups = await apiRequest({
                        entity: `users_calendars?userId=${userId}`,
                        method: "GET"
                    });

                    if (!usergroups) {
                        usergroups = [];
                    }

                } catch (err) {
                    console.error("Usergroups fetch error:", err);
                    usergroups = [];
                }


                // Get Friends
                let friends;

                try {
                    friends = await apiRequest({
                        entity: `friendships?userId=${userId}`,
                        method: "GET"
                    });

                    if (!friends) {
                        friends = [];
                    }

                } catch (err) {
                    console.error("Friends fetch error:", err);
                    friends = [];
                }


                // Get PMs
                let privateMessages;

                try {
                    privateMessages = await apiRequest({
                        entity: `private_msg`,
                        method: "GET"
                    });

                    privateMessages = privateMessages.filter((x) => x.senderId === userId || x.receiverId === userId);

                    if (!privateMessages) {
                        privateMessages = [];
                    }

                } catch (err) {
                    console.error("Private messages fetch error:", err);
                    privateMessages = [];
                }

                // Get Cal MSGS
                const calendarMessages = [];

                if (usergroups.length) {

                    for (let ug of usergroups) {

                        let msgs;

                        try {
                            msgs = await apiRequest({
                                entity: `calendar_msg?senderId=${userId}&calId=${ug.calId}`,
                                method: "GET"
                            });

                            if (!msgs) {
                                msgs = [];
                                continue;
                            }

                            for (let msg of msgs) {
                                calendarMessages.push(msg);
                            }

                        } catch (err) {
                            console.error("Calendar messages fetch error:", err);
                            msgs = [];
                        }
                    }
                }


                // Get Pinned Cals
                let pinned;

                try {
                    pinned = await apiRequest({
                        entity: `users_pinned_calenders?userId=${userId}`,
                        method: "GET"
                    });

                    if (!pinned) {
                        pinned = [];
                    }

                } catch (err) {
                    console.error("Pinned fetch error:", err);
                    pinned = [];
                }


                // Get Avails
                let availabilities;

                try {
                    availabilities = await apiRequest({
                        entity: `users_availabilities?userId=${userId}`,
                        method: "GET"
                    });

                    if (!availabilities) {
                        availabilities = [];
                    }

                } catch (err) {
                    console.error("Availabilities fetch error:", err);
                    availabilities = [];
                }


                // Get Cals
                const cals = [];

                if (usergroups.length) {

                    for (let ug of usergroups) {

                        let cal;

                        try {
                            cal = await apiRequest({
                                entity: `calendars?id=${ug.calId}`,
                                method: "GET"
                            });

                            if (!cal) {
                                continue;
                            }

                            cals.push(cal);

                        } catch (err) {
                            console.error("Calendar fetch error:", err);
                            cal = null;
                        }
                    }
                }

                //Get notis
                let notis;

                if (userId) {
                    try {
                        notis = await apiRequest({
                            entity: `notifications?userId=${userId}`,
                            method: "GET"
                        });
                    } catch (e) {
                        console.log("Notifications fetch error:", e);
                        notis = null;
                    }
                }


                // Get Events
                let events = [];

                if (cals.length) {

                    for (let cal of cals) {

                        let eventsForCal;

                        try {
                            eventsForCal = await apiRequest({
                                entity: `events?calId=${cal.id}`,
                                method: "GET"
                            });

                            if (!eventsForCal) {
                                eventsForCal = [];
                                continue;
                            }

                            for (let event of eventsForCal) {
                                events.push(event);
                            }

                        } catch (err) {
                            console.error("Events fetch error:", err);
                            eventsForCal = [];
                        }
                    }
                }

                // UPDATE STORE
                // UPDATE STATE (all data)
                store.setState({
                    usergroups: usergroups,
                    cals: cals,
                    events: events,
                    friends: friends,
                    privateMessages: privateMessages,
                    calendarMessages: calendarMessages,
                    userPinnedCalendars: pinned,
                    availabilites: availabilities,
                    notis: notis
                });

                PubSub.publish(EVENTS.STATE.LOGIN.SUCCESS, { userId });

                console.log("------ DEVELOPMENT PRODUCTION LOGS -------")
                console.log("State: ", store.getState())
                console.log("------ DEVELOPMENT PRODUCTION LOGS -------")

            } catch (err) {

                console.error("StoreService login error:", err);
                PubSub.publish(EVENTS.STATE.LOGIN.ERROR, err);

            }
        });

        PubSub.subscribe(EVENTS.STATE.LOGOUT.START, () => {

            store.resetState();

            PubSub.publish(EVENTS.STATE.LOGOUT.SUCCESS);
            PubSub.publish(EVENTS.STORE.UPDATED.ISLOGGEDIN);

        });
    }
}

new StoreService();
