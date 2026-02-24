// GENERELL TEST-FETCHER 

async function runTest({ url, method = "GET", body = null, targetId }) {
    
    const card = document.querySelector(`#${targetId}`);
    const box = card.querySelector(".result-box");

    try {
        const request = await fetch(url, {
            method,
            headers: body ? { "Content-Type": "application/json" } : {},
            body: body ? JSON.stringify(body) : null
        });
        let response;
        const contentType = request.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
            response = await request.json();
        } else {
            response = await request.text();
        }
        card.style.borderColor = request.ok ? "green" : "red";

        box.textContent = 
            typeof response === "string"
                ? response
                : JSON.stringify(response, null, 2);


    } catch (err) {
        card.style.backgroundColor = "red";
        card.innerHTfML = `<p>ERROR</p><pre>${err}</pre>`;
    }
}



/* ----- RESOURCE 1 (users/events etc) ------- */
function getFriendships() {
    return runTest({
        url: "http://localhost:8000/friendships?userId=65e10aa11a001",
        method: "GET",
        targetId: "getFriendships"
    });
}

function postFriendship() {
    return runTest({
        url: "http://localhost:8000/friendships",
        method: "POST",
        body: { 
            userId1: "65e10aa11a001",
            userId2: "65e10aa11a00a"
        },
        targetId: "postFriendship"
    });
}

function deleteFriendship() {
    return runTest({
        url: "http://localhost:8000/friendships",
        method: "DELETE",
        body: { 
            userId1: "65e10aa11a001",
            userId2: "65e10aa11a00a"
        },
        targetId: "deleteFriendship"
    });
}




/* ----- RESOURCE 2 (users_calendars etc) ------- */

function getUsersCalendars() {
    return runTest({
        url: "http://localhost:8000/users_calendars",
        targetId: "getUsersCalendars"
    });
}

function postUsersCalendars() {
    return runTest({
        url: "http://localhost:8000/users_calendars",
        method: "POST",
        body: {
            userId: "65e10aa11a001",
            calId:"65e10aa11b003",
            },
        targetId: "postUsersCalendars"
    });

    
}

function badPostUsersCalendars() {
    return runTest({
        url: "http://localhost:8000/users_calendars",
        method: "POST",
        body: {
            userId: "65e10aa11a001",
            },
        targetId: "badPostUsersCalendars"
    });

    
}

function postNoUsersCalendars() {
    return runTest({
        url: "http://localhost:8000/users_calendars",
        method: "POST",
        body: {
            userId: "65eda",
            calId:"65e10aa11b003",
            },
        targetId: "postNoUsersCalendars"
    });

    
}

function postAlreadyInUsersCalendars() {
    return runTest({
        url: "http://localhost:8000/users_calendars",
        method: "POST",
        body: {
            userId: "65e10aa11a001",
            calId:"65e10aa11b003",
            },
        targetId: "postAlreadyInUsersCalendars"
    });

    
}
///Denna har jag inte gjort klart pga. session
function patchUserAdminStatus(){
    return runTest({
        url: "http://localhost:8000/users_calendars",
        method: "PATCH",
        body: {
            sessionId: "sflkasjf", 
            changeUserId: "198247941", 
            calId: "320713", 
            adminStatus: true
            },
        targetId: "postAlreadyInUsersCalendars"
    });
}

function deleteUsersCal(){
        return runTest({
        url: "http://localhost:8000/users_calendars",
        method: "DELETE",
        body: {
            userId: "65e10aa11a001",
            calId:"65e10aa11b003",
            },
        targetId: "deleteUsersCalendars"
    });

}
function deleteUsersCalMissing(){
        return runTest({
        url: "http://localhost:8000/users_calendars",
        method: "PATCH",
        body: {
            userId: "65e10aa11a001"
            },
        targetId: "deleteUsersCalMissing"
    });

}
function deleteUsersCalNotFound(){
        return runTest({
        url: "http://localhost:8000/users_calendars",
        method: "PATCH",
        body: {
            userId: "65e10aa11a001"
            },
        targetId: "deleteUsersCalNotFound"
    });

}




    


/* ---- RUN TESTS ---- */
async function runFunctions() {
    getFriendships();
    postFriendship();
    deleteFriendship();
    getUsersCalendars();
    postUsersCalendars();
    badPostUsersCalendars();
    postNoUsersCalendars();
    postAlreadyInUsersCalendars();
    deleteUsersCal();
    deleteUsersCalMissing()
    deleteUsersCalNotFound()



    // RESOURCE 2

}

runFunctions();