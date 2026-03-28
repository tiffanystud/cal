
import { apiRequest } from "./api.js";
import { PubSub } from "../store/pubsub.js";
import { EVENTS } from "../store/events.js";

export function MessagesService() {


    // Payload = {userId, msgType}
    PubSub.subscribe(EVENTS.REQUEST.SENT.MESSAGES.GET, async function (payload) {

        PubSub.publish(EVENTS.REQUEST.RECEIVED.MESSAGES.GET, true);

        const userId = payload.userId;
        const msgType = payload.msgType;

        if (msgType == "all") {

            try {

                const resourceUserCalendars = await apiRequest({
                    entity: "/user_calendars",
                    method: "GET"
                })

                const resourcePrivateMsg = await apiRequest({
                    entity: "/private_msg",
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

                // Get users calendars
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

                // Get users private msgs
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
                    calendarMsg: resourceCalendarMsg,
                    privateMsg: resourcePrivateMsg
                }, true)


                return {
                    privateMSG: filteredPrivateMsg,
                    calendarMSG: filteredCalMsg
                }

            } catch (err) {

                PubSub.publish(EVENTS.REQUEST.ERROR.MESSAGES.GET, err, true)

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

}

MessagesService();