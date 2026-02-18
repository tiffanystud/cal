// USERSTABLE

async function getUser() {
    let request = await fetch("http://localhost:8000/users?id=1&userName=Neo&pwd=123&email=mail@gmail.com");
    if (request.ok) {
        let response = await request.json();
        console.log(response)
        document.querySelector("#getUser").style.backgroundColor = "green";
        document.querySelector("#getUser").innerHTML = `<p>${request.status}</p><p>${JSON.stringify(response)}</p>`
    } else {
        let response = await request.json();
        document.querySelector("#getUser").style.backgroundColor = "red";
        document.querySelector("#getUser").textContent = `<p>${request.status}</p><p>${JSON.stringify(response)}</p>`
    }
}

async function postUser() {
    let request = await fetch("http://localhost:8000/users", {
        method: "POST",
        body: JSON.stringify({ id: 7, userName: "Philip", pwd: "hejhej%", email: "philles@" }),
        headers: { "Content-Type": "application/json" }
    })
    if (request.ok) {
        let response = await request.text();
        console.log(response)
        document.querySelector("#postUser").style.backgroundColor = "green";
        document.querySelector("#postUser").innerHTML = `<p>${request.status}</p><p>${JSON.stringify(response)}</p>`
    } else {
        let response = await request.text();
        console.log(response);
        document.querySelector("#postUser").style.backgroundColor = "red";
        document.querySelector("#postUser").innerHTML = `<p>${request.status}</p><p>${JSON.stringify(response)}</p>`
    }
}

async function patchUser() {
    let request = await fetch("http://localhost:8000/users", {
        method: "PATCH",
        body: JSON.stringify({ id: 1, userName: "Elias", pwd: "hejhej%" }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.text();
    if (response.ok) {
        document.querySelector("#patchUser").style.backgroundColor = "green";
        document.querySelector("#postUser").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#patchUser").style.backgroundColor = "red";
        document.querySelector("#patchUser").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}

async function deleteUser() {
    let request = await fetch("http://localhost:8000/users", {
        method: "DELETE",
        body: JSON.stringify({ id: 1, userName: "Elias", pwd: "hejhej%", email: "mail@gmail.com" }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.ok) {
        document.querySelector("#deleteUser").style.backgroundColor = "green";
        document.querySelector("#deleteUser").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#deleteUser").style.backgroundColor = "red";
        document.querySelector("#deleteUser").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}

// GROUPSTABLE

async function getGroup() {
    let request = await fetch("http://localhost:8000/groups");
    let response = await request.json();
    if (response.ok) {
        document.querySelector("#getGroup").style.backgroundColor = "green";
        document.querySelector("#getGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#getGroup").style.backgroundColor = "red";
        document.querySelector("#getGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}

async function postGroup() {
    let request = await fetch("http://localhost:8000/groups", {
        method: "POST",
        body: JSON.stringify({ name: "Group 50" }),
        headers: { "Content-Type": "application/json" }
    })
        console.log("HEJ")
        console.log(await request)
    let response = await request.statusText;
    
    if (request.ok) {
        document.querySelector("#postGroup").style.backgroundColor = "green";
        document.querySelector("#postGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#postGroup").style.backgroundColor = "red";
        document.querySelector("#postGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}

async function patchGroup() {
    let request = await fetch("http://localhost:8000/groups", {
        method: "PATCH",
        body: JSON.stringify({ id: 3, name: "Test group" }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.ok) {
        document.querySelector("#patchGroup").style.backgroundColor = "green";
        document.querySelector("#patchGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#patchGroup").style.backgroundColor = "red";
        document.querySelector("#patchGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}

async function deleteGroup() {
    let request = await fetch("http://localhost:8000/groups", {
        method: "DELETE",
        body: JSON.stringify({ id: 3, name: "Test group" }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.ok) {
        document.querySelector("#deleteGroup").style.backgroundColor = "green";
        document.querySelector("#deleteGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#deleteGroup").style.backgroundColor = "red";
        document.querySelector("#deleteGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}


// USERGROUPTABLE


async function getUserGroup() {
    let request = await fetch("http://localhost:8000/users_groups");
    let response = await request.json();
    if (response.ok) {
        document.querySelector("#getUserGroup").style.backgroundColor = "green";
        document.querySelector("#getUserGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#getUserGroup").style.backgroundColor = "red";
        document.querySelector("#getUserGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}

async function postUserGroup() {
    let request = await fetch("http://localhost:8000/users_groups", {
        method: "POST",
        body: JSON.stringify({ userId: 6, groupId: 5, isAdmin: false }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.text();
    console.log(response);
    if (response.ok) {
        document.querySelector("#postUserGroup").style.backgroundColor = "green";
        document.querySelector("#postUserGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#postUserGroup").style.backgroundColor = "red";
        document.querySelector("#postUserGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}

async function patchUserGroup() {
    let request = await fetch("http://localhost:8000/users_groups", {
        method: "PATCH",
        body: JSON.stringify({ id: 3, isAdmin: true }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.ok) {
        document.querySelector("#patchUserGroup").style.backgroundColor = "green";
        document.querySelector("#patchUserGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#patchUserGroup").style.backgroundColor = "red";
        document.querySelector("#patchUserGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}

async function deleteUserGroup() {
    let request = await fetch("http://localhost:8000/users_groups", {
        method: "DELETE",
        body: JSON.stringify({ id: 3, userId: 6, groupId: 5, isAdmin: false }),
        headers: { "Content-Type": "application/json" }
    })
    let response = await request.json();
    if (response.ok) {
        document.querySelector("#deleteUserGroup").style.backgroundColor = "green";
        document.querySelector("#deleteUserGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    } else {
        document.querySelector("#deleteUserGroup").style.backgroundColor = "red";
        document.querySelector("#deleteUserGroup").textContent = `<p>${request.status}</p><p>${response}</p>`
    }
}


async function runFunctions() {
    await getUser();
    await postUser();
    await patchUser();
    await deleteUser();

    await getGroup();
    await postGroup();
/*  await patchGroup();
    await deleteGroup();

    await getUserGroup();
    await postUserGroup();
    await patchUserGroup();
    await deleteUserGroup(); */
}
runFunctions();
