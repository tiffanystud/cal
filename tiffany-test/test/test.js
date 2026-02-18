// USERSTABLE
async function getUser() {
    let request = await fetch("http://localhost:8000/User");
    let response = await request.json();
    if (response.status.ok) {
        document.querySelector("#getUser").style.backgroundColor = "green";
        document.querySelector("#getUser").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    } else {
        document.querySelector("#getUser").style.backgroundColor = "red";
        document.querySelector("#getUser").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    }
}

async function postUser() {
    let request = await fetch("http://localhost:8000/User", {
        method: "POST",
        body: JSON.stringify({ userName: "Philip", password: "hejhej%", email: "philles@" }),
        header: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.status.ok) {
        document.querySelector("#postUser").style.backgroundColor = "green";
        document.querySelector("#postUser").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    } else {
        document.querySelector("#postUser").style.backgroundColor = "red";
        document.querySelector("#postUser").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    }
}

async function patchUser() {
    let request = await fetch("http://localhost:8000/User", {
        method: "PATCH",
        body: JSON.stringify({ userId: 1, userName: "Elias", password: "citron" }),
        header: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.status.ok) {
        document.querySelector("#patchUser").style.backgroundColor = "green";
        document.querySelector("#postUser").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    } else {
        document.querySelector("#patchUser").style.backgroundColor = "red";
        document.querySelector("#patchUser").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    }
}

async function deleteUser() {
    let request = await fetch("http://localhost:8000/User", {
        method: "DELETE",
        body: JSON.stringify({ userId: 1, userName: "Elias", password: "citron" }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.status.ok) {
        document.querySelector("#deleteUser").style.backgroundColor = "green";
        document.querySelector("#deleteUser").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    } else {
        document.querySelector("#deleteUser").style.backgroundColor = "red";
        document.querySelector("#deleteUser").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    }
}

// GROUPSTABLE

async function getGroup() {
    let request = await fetch("http://localhost:8000/groups");
    let response = await request.json();
    if (response.status.ok) {
        document.querySelector("#getGroup").style.backgroundColor = "green";
        document.querySelector("#getGroup").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    } else {
        document.querySelector("#getGroup").style.backgroundColor = "red";
        document.querySelector("#getGroup").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    }
}

async function postGroup() {
    let request = await fetch("http://localhost:8000/groups", {
        method: "POST",
        body: JSON.stringify({ name: "Group 2" }),
        header: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.status.ok) {
        document.querySelector("#postGroup").style.backgroundColor = "green";
        document.querySelector("#postGroup").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    } else {
        document.querySelector("#postGroup").style.backgroundColor = "red";
        document.querySelector("#postGroup").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    }
}

async function patchGroup() {
    let request = await fetch("http://localhost:8000/groups", {
        method: "PATCH",
        body: JSON.stringify({ id: 3, name: "Test group" }),
        header: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.status.ok) {
        document.querySelector("#patchGroup").style.backgroundColor = "green";
        document.querySelector("#patchGroup").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    } else {
        document.querySelector("#patchGroup").style.backgroundColor = "red";
        document.querySelector("#patchGroup").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    }
}

async function deleteGroup() {
    let request = await fetch("http://localhost:8000/groups", {
        method: "DELETE",
        body: JSON.stringify({ id: 3, name: "Test group" }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.status.ok) {
        document.querySelector("#deleteGroup").style.backgroundColor = "green";
        document.querySelector("#deleteGroup").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    } else {
        document.querySelector("#deleteGroup").style.backgroundColor = "red";
        document.querySelector("#deleteGroup").textContent = `<p>${response.status}</p><p>${response.body}</p>`
    }
}


// USERGROUPTABLE


async function getUserGroup() {
    let request = await fetch("http://localhost:8000/users_groups");
    let response = await request.json();
    return response.status;
}

async function postUserGroup() {
    let request = await fetch("http://localhost:8000/users_groups", {
        method: "POST",
        body: JSON.stringify({ userId: 6, groupId: 5, isAdmin: false }),
        header: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    return response.status;
}

async function patchUserGroup() {
    let request = await fetch("http://localhost:8000/users_groups", {
        method: "PATCH",
        body: JSON.stringify({ id: 3, isAdmin: true }),
        header: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    return response.status;
}

async function deleteUserGroup() {
    let request = await fetch("http://localhost:8000/users_groups", {
        method: "DELETE",
        body: JSON.stringify({ id: 3, userId: 6, groupId: 5, isAdmin: false }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    return response.status;
}


async function runFunctions() {
    await getUser();
    await postUser();
    await patchUser();
    await deleteUser();

    await getGroup();
    await postGroup();
    await patchGroup();
    await deleteGroup();

    await getUserGroup();
    await postUserGroup();
    await patchUserGroup();
    await deleteUserGroup();
}