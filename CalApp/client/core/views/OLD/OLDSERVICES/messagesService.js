
import { apiRequest } from "../../../services/api.js";
import { PubSub } from "../../../store/pubsub.js";
import { store } from "../../../store/store.js";
import { EVENTS } from "../../../store/events.js";

export function MessagesService() {


    // Payload = {userId, msgType}
    PubSub.subscribe(EVENTS.REQUEST.SENT.MESSAGES.GET, async function (payload) {

        PubSub.publish(EVENTS.REQUEST.RECEIVED.MESSAGES.GET, true);

        const userId = payload.userId;
        const msgType = payload.msgType;

        if (msgType == "all") {

            try {

                const state = store.getState();

                const resourceUserCalendars = state.usergroups;
                const resourcePrivateMsg = state.privateMessages;
                const resourceCalendarMsg = state.calendarMessages;
                const resourceCalendars = state.cals;
                const resourceUsers = await apiRequest({
                    entity: "users",
                    method: "GET"
                })

                // Filter User Cals
                const userCalIds = resourceUserCalendars
                    .filter(uc => uc.userId == userId)
                    .map(uc => uc.calId);

                // Get all cals for User Cals
                let filteredCalMsg = [];
                for (let currCalMsg of resourceCalendarMsg) {
                    if (userCalIds.includes(currCalMsg.calId)) {
                        filteredCalMsg.push(currCalMsg);
                    }
                }

                // All PMGS
                let filteredPrivateMsg = [];
                for (let currPM of resourcePrivateMsg) {
                    if (currPM.senderId == userId || currPM.receiverId == userId) {
                        filteredPrivateMsg.push(currPM);
                    }
                }

                // Response 
                PubSub.publish(EVENTS.RESPONSE.RECEIVED.MESSAGES.GET, {
                    privateMSG: filteredPrivateMsg,
                    calendarMSG: filteredCalMsg,
                    users: resourceUsers,
                    calendars: resourceCalendars
                }, true);

                // Resource
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.MESSAGES.GET, {
                    userCalendars: resourceUserCalendars,
                    calendarMsg: filteredCalMsg,
                    privateMsg: resourcePrivateMsg
                }, true);

            } catch (err) {
                PubSub.publish(EVENTS.REQUEST.ERROR.MESSAGES.GET, err, true);
            }
        } else if (msgType == "private") {

            try {

                const resourcePrivateMsg = await apiRequest({
                    entity: "/private_msg",
                    method: "GET"
                })

                const resourceUsers = await apiRequest({
                    entity: "/users",
                    method: "GET"
                })

                let filteredPrivateMsg = [];
                for (let currPM of resourcePrivateMsg) {
                    if (currPM.senderId == userId || currPM.receiverId == userId) {
                        filteredPrivateMsg.push(currPM);
                    }
                }

                // Response
                PubSub.publish(EVENTS.RESPONSE.RECEIVED.MESSAGES.GET, {
                    privateMSG: filteredPrivateMsg,
                    users: resourceUsers
                }, true)

                // Resource
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.MESSAGES.GET, {
                    privateMSG: resourcePrivateMsg
                }, true)

                return {
                    privateMSG: filteredPrivateMsg,
                }

            } catch (err) {
                PubSub.publish(EVENTS.REQUEST.ERROR.MESSAGES.GET, err)
            }

        } else if (msgType == "calendar") {

            try {

                const resourceUserCalendars = await apiRequest({
                    entity: "/user_calendars",
                    method: "GET"
                })

                const resourceCalendarMsg = await apiRequest({
                    entity: "/calendar_msg",
                    method: "GET"
                })

                const resourceCalendars = await apiRequest({
                    entity: "/calendars",
                    method: "GET"
                })

                const resourceUsers = await apiRequest({
                    entity: "/users",
                    method: "GET"
                })

                let filteredUGCals = []
                for (let currUg of resourceUserCalendars) {
                    if (currUg.userId == userId) {
                        filteredUGCals.push(currUg);
                    }
                }

                // Get all calendar msgs for all UGS
                let filteredCalMsg = [];
                for (let currCalMsg of resourceCalendarMsg) {
                    for (let currUG of filteredUGCals) {
                        if (currCalMsg.calId == currUG.calId) {
                            filteredCalMsg.push(currCalMsg);
                        }
                    }
                }

                // Response
                PubSub.publish(EVENTS.RESPONSE.RECEIVED.MESSAGES.GET, {
                    userCalendars: resourceUserCalendars,
                    calendarMsg: resourceCalendarMsg
                }, true)


                // Resource
                PubSub.publish(EVENTS.RESOURCE.RECEIVED.MESSAGES.GET, {
                    userCalendars: resourceUserCalendars,
                    calendarMsg: resourceCalendarMsg
                }, true)

                return {
                    calendarMSG: filteredCalMsg
                }

            } catch (err) {
                PubSub.publish(EVENTS.REQUEST.ERROR.MESSAGES.GET, err, true)
            }
        }

        PubSub.publish(EVENTS.REQUEST.ERROR.MESSAGES.GET, {
            message: "Unknown msgType",
            sentMsgType: msgType
        }, true);

    })


    PubSub.subscribe(EVENTS.DATA.SELECTED.MESSAGES, async (payload) => {

        const resourceUsers = await apiRequest({
            entity: "users",
            method: "GET"
        });

        const resourcePrivate = await apiRequest({
            entity: "private_msg",
            method: "GET"
        });

        const resourceCalendar = await apiRequest({
            entity: "calendar_msg",
            method: "GET"
        });

        PubSub.publish(EVENTS.DATA.RETURNED.MESSAGES, {
            users: resourceUsers,
            privateMSG: resourcePrivate,
            calendarMSG: resourceCalendar,
            chatType: payload.chatType,
            chatId: payload.chatId
        });

    });


}

MessagesService();
