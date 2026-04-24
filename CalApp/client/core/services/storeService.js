import { APIRequest } from "./APIService.js";
import { PubSub } from "../store/Pubsub.js";
import { Store } from "../store/Store.js";
import { EVENTS } from "../store/Events.js";


export class storeService {

    constructor() {
        // this.subs();
    }

    viewServiceSubs() {

        // Auth
        PubSub.subscribe(EVENTS.AUTH.LOGIN.START, async (payload) => {

            const userId = payload.userId;

            try {

                // Get User
                const currUser = await APIRequest({
                    entity: `users?id=${userId}`,
                    method: "GET"
                });

                if (!currUser) {
                    return;
                }

                Store.setState({
                    isLoggedIn: {
                        id: currUser.id,
                        username: currUser.name,
                        email: currUser.email
                    }
                }, true);

                // Get UGs
                let usergroups;

                try {

                    usergroups = await APIRequest({
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

                    friends = await APIRequest({
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

                    privateMessages = await APIRequest({
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
                            msgs = await APIRequest({
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
                    pinned = await APIRequest({
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
                    availabilities = await APIRequest({
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
                            cal = await APIRequest({
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
                        notis = await APIRequest({
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
                            eventsForCal = await APIRequest({
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

                Store.setState({
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

            Store.resetState();

            PubSub.publish(EVENTS.AUTH.LOGOUT.SUCCESS, null, true);
            PubSub.publish(EVENTS.DATA.UPDATED.ISLOGGEDIN, null, true);

        }, true);

        // Selected
        PubSub.subscribe(EVENTS.DATA.SELECTED.CALENDARS, (ids = null) => {
            // Expects array if sevral

            const currStateNotis = Store.getState().cals;

            // No ID (return all)
            if (!ids) return currStateNotis;

            // One ID (return filtered)
            if (!ids[1]) return currStateCals.find(currCal => currCal.id == ids);

            // Sevral IDs (return filtered)
            let filteredCals = [];
            for (let currId of ids) {
                for (currCal of currStateNotis) {
                    if (currCal.id == currId) filteredCals.push(currCal);
                }
            }
            return filteredCals;

        })


        PubSub.subscribe(EVENTS.DATA.SELECTED.NOTIFICATIONS, (ids = null) => {
            // Expects array if sevral

            const currStateNotis = Store.getState().notis;

            // No ID (return all)
            if (!ids) return currStateNotis;

            // One ID (return filtered)
            if (!ids[1]) return currStateNotis.find(currCal => currCal.id == ids);

            // Sevral IDs (return filtered)
            let filteredNotis = [];
            for (let currId of ids) {
                for (currNotis of currStateNotis) {
                    if (currNotis.id == currId) filteredNotis.push(currCal);
                }
            }
            return filteredNotis;

        })

        PubSub.subscribe(EVENTS.DATA.SELECTED.USERCALENDARS, (ids) => {

            let userCalsState = Store.getState().usercalendars;

            if (!ids) {
                return userCalsState;
            }

            if (!ids[1]) {
                return userCalsState.find(userCals => userCals.id == ids);
            }

            let filteredUserCals = [];
            for (let userCalId of ids) {
                for (let userCal of userCalsState) {
                    if (userCalId == userCal.id) {
                        filteredUserCals.push(userCal);
                    }
                }
            }

            return filteredUserCals;

        })

        PubSub.subscribe(EVENTS.DATA.SELECTED.EVENTS, (ids) => {
            // Här uppdaterar den först entiteten i statet
            PubSub.publish(EVENTS.REQUEST.SENT.EVENTS.GET);


            let eventState = Store.getState().events;

            if (!ids) {
                return eventState;
            }

            if ([!ids[1]]) {
                return eventState.find(event => event.id == ids);
            }

            let filteredEvents = [];
            for (let eventId of ids) {
                for (let event of eventState) {
                    if (eventId == event.id) {
                        filteredEvents.push(event);
                    }
                }
            }

            return filteredEvents;

        })

        PubSub.subscribe(EVENTS.DATA.SELECTED.EVENTSRSVP, (ids) => {

            let eventRsvpState = Store.getState().eventsRsvp;

            if (!ids) {
                return eventRsvpState;
            }

            if (!ids[1]) {
                return eventRsvpState.find(eventRsvp => eventRsvp.id == ids.id);
            }

            let filteredEventsRsvp = [];
            for (let eventRsvpId of ids) {
                for (let eventRsvp of eventRsvpState) {
                    if (eventRsvpId == eventRsvp.id) {
                        filteredEventsRsvp.push(eventRsvp);
                    }
                }
            }

            return filteredEventsRsvp;

        })

    }

    apiServiceSubs() {

        // Takes entitiyname, method and responsedata from api to setState. This makes the event unified for all entities,
        // instead of having more subscribes per entitiy and method here.
        PubSub.subscribe(EVENTS.DATA.UPDATED, (data) => {

            let entityArray = Store.getState()[data.entity];

            if (data.method == "created") {

                Store.setState({ [data.entity]: [...entityArray, data.responseData] })
            }

            else if (data.method == "changed") {
                let filteredArray = entityArray.filter(obj => obj.id != data.responseData.id);
                Store.setState({ [data.entity]: [...filteredArray, data.responseData] });
            }

            else if (data.method == "deleted") {

                let filteredArray = entityArray.filter(obj => obj.id != data.responseData.id);
                Store.setState({ [data.entity]: filteredArray });
            }
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