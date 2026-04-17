import { apiRequest } from "./ApiService.js";
import { PubSub } from "../store/Pubsub.js";
import { store } from "../store/Store.js";
import { EVENTS } from "../store/Events.js";


export class storeService {

    constructor() {
        this.subs();
    }

    subs() {

        // Auth
        PubSub.subscribe(EVENTS.AUTH.LOGIN.START, async (payload) => {

            const userId = payload.userId;

            try {

                // Get User
                const currUser = await apiRequest({
                    entity: `users?id=${userId}`,
                    method: "GET"
                });

                if (!currUser) {
                    return;
                }

                store.setState({
                    isLoggedIn: {
                        id: currUser.id,
                        username: currUser.name,
                        email: currUser.email
                    }
                }, true);

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
                            eventsForCal = [];
                        }
                    }
                }

                store.setState({
                    usergroups: usergroups,
                    cals: cals,
                    events: events,
                    friends: friends,
                    privateMessages: privateMessages,
                    calendarMessages: calendarMessages,
                    userPinnedCalendars: pinned,
                    availabilities: availabilities,
                    notis: notis
                }, true);

                PubSub.publish(EVENTS.AUTH.LOGIN.SUCCESS, { userId }, true);


            } catch (err) {

                PubSub.publish(EVENTS.AUTH.LOGIN.ERROR, err, true);


            }
        }, true);

        PubSub.subscribe(EVENTS.AUTH.LOGOUT.START, () => {

            store.resetState();

            PubSub.publish(EVENTS.AUTH.LOGOUT.SUCCESS, null, true);
            PubSub.publish(EVENTS.DATA.UPDATED.ISLOGGEDIN, null, true);

        }, true);

        // Selected
        PubSub.subscribe(EVENTS.DATA.SELECTED.CALENDARS, (ids = null) => {
            // Expects array

            const currStateCals = store.getState().cals;

            // No ID (return all)
            if (!ids) return currStateCals;

            // One ID (return filtered)
            if (!ids[1]) return currStateCals.find(currCal => currCal.id == id);

            // Sevral IDs (return filtered)
            let filteredCals = [];
            for (let currId of ids) {
                for (currCal of currStateCals) {
                    if (currCal.id == currId) filteredCals.push(currCal);
                }
            }
            return filteredCals;

        })

    }

    // Use to subscribe to changes in state
    static getNotifiedStoreChanges(stateKey, callback) {
        
        // Ex ( "cals", ("newCalData") => {console.log("New Cals", newCalData)} );
        store.subscribe(stateKey, (data) => {
            callback(data);
        });
    }
    
}

export const StoreService = new storeService();