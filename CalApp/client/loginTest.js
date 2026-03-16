import { apiRequest } from "./core/services/api.js";
import { store } from "./core/store/store.js";

async function getUser(userId){
    try {
        let user = await apiRequest({entity: `users?id=${userId}`, method: "GET"});
        return user;
    } catch (error){
        console.log(error);
        return error;
    }
}

async function getUC(userId){
    try {
        let usersCals = await apiRequest({entity: `users_calendars?userId=${userId}`, method: "GET"});
        return usersCals

    } catch (error) {
        return error;
    }
}

async function getCals(usersCals){
    let cals = [];
    if (usersCals.length > 1){
        for (let uC of usersCals){
            try {
                let cal = await apiRequest({entity: `calendars?id=${uC.calId}`, method: "GET"});
                cals.push(cal);
            } catch (error) {
                return error;
            }
        }
    } else {
        try {
            let cal = await apiRequest({entity: `calendars?id=${usersCals.calId}`, method: "GET"});
            cals.push(cal);
        } catch (error){
            return error;
        }
    }
    return cals;
    
}

async function getEvents(cals){
    let events;
    //if (cals.length <= 1){
    //    await apiRequest(`event?calId=${cals.id}`, "GET")
    //} else {
    //    for (let cal of cals){
    //        try {
    //        let eventsOfCal = await apiRequest(`event?calId=${cal.id}`, "GET");
    //        for (let e of eventsOfCal){
    //            events.push(e);
    //        }
    //        } catch (error){
    //            return error;
    //        }
    //    }
    //}
    return events;

}

async function getFriends(userId){
    let friends;
    try {
        friends = apiRequest(`friendships?userId=${user.id}`, "GET");
    } catch(error){
        return error;
    }

}

export async function loginSimulation(){
    let user = await getUser("65e10aa11a001");
    console.log(user);
    //USERSCALS
    let usersCals = await getUC(user.id);
    console.log(usersCals);
    //CALS
    let cals = await getCals(usersCals);
    console.log(cals);

    // EVENTS

    let events = await getEvents(cals);

    //FRIENDS
    let friends = await getFriends(user.id);


    let newState = {
        isLoggedIn: {
            id: user.id,
            username: user.name,
            email: user.email
        },
        userData: {
            cals: cals,
            events: events,
            friends: friends,

        }
    }
    return store.setState(newState);

}