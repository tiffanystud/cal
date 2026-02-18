// -----------------------------
// GENERELL TEST-FETCHER
// -----------------------------
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


/* ----- USERS ------- */
function getUser() {
    return runTest({
        url: "http://localhost:8000/users?id=1&userName=Neo&pwd=123&email=mail@gmail.com",
        targetId: "getUser"
    });
}

function postUser() {
    return runTest({
        url: "http://localhost:8000/users",
        method: "POST",
        body: { id: 7, userName: "Philip", pwd: "hejhej%", email: "philles@" },
        targetId: "postUser"
    });
}

function patchUser() {
    return runTest({
        url: "http://localhost:8000/users",
        method: "PATCH",
        body: { id: 1, userName: "Elias", pwd: "hejhej%" },
        targetId: "patchUser"
    });
}

function deleteUser() {
    return runTest({
        url: "http://localhost:8000/users",
        method: "DELETE",
        body: { id: 1, userName: "Elias", pwd: "hejhej%", email: "mail@gmail.com" },
        targetId: "deleteUser"
    });
}



/* ----- GROUPS ------- */

function getGroup() {
    return runTest({
        url: "http://localhost:8000/groups",
        targetId: "getGroup"
    });
}

function postGroup() {
    return runTest({
        url: "http://localhost:8000/groups",
        method: "POST",
        body: { name: "Group 50" },
        targetId: "postGroup"
    });
}

function patchGroup() {
    return runTest({
        url: "http://localhost:8000/groups",
        method: "PATCH",
        body: { id: 3, name: "Test group" },
        targetId: "patchGroup"
    });
}

function deleteGroup() {
    return runTest({
        url: "http://localhost:8000/groups",
        method: "DELETE",
        body: { id: 3, name: "Test group" },
        targetId: "deleteGroup"
    });
}


/* ----- USERS_GROUPS ------- */
function getUserGroup() {
    return runTest({
        url: "http://localhost:8000/users_groups",
        targetId: "getUserGroup"
    });
}

function postUserGroup() {
    return runTest({
        url: "http://localhost:8000/users_groups",
        method: "POST",
        body: { userId: 6, groupId: 5, isAdmin: false },
        targetId: "postUserGroup"
    });
}

function patchUserGroup() {
    return runTest({
        url: "http://localhost:8000/users_groups",
        method: "PATCH",
        body: { id: 3, isAdmin: true },
        targetId: "patchUserGroup"
    });
}

function deleteUserGroup() {
    return runTest({
        url: "http://localhost:8000/users_groups",
        method: "DELETE",
        body: { id: 3, userId: 6, groupId: 5, isAdmin: false },
        targetId: "deleteUserGroup"
    });
}



/* ---- RUN TESTS ---- */
async function runFunctions() {
    // USERS
/*     await getUser();
    await postUser();
    await patchUser();
    await deleteUser(); */

    // GROUPS
    await getGroup();
    await postGroup();
    await patchGroup();
    await deleteGroup();

    // USERS_GROUPS
/*     await getUserGroup();
    await postUserGroup();
    await patchUserGroup();
    await deleteUserGroup(); */
}

runFunctions();
