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
        console.log(request.ok);
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




/* ----- RESOURCE 2 (users/events etc) ------- */

function getUsersCalendars() {
    return runTest({
        url: "http://localhost:8000/users_calendars",
        targetId: "getUsersCalendars"
    });
}



    


/* ---- RUN TESTS ---- */
async function runFunctions() {
    getFriendships();
    postFriendship();
    deleteFriendship();
    getUsersCalendars();



    // RESOURCE 2

}

runFunctions();