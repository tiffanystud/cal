const printTests = function(url, method, reso, status) {
    let div = document.createElement("div");
    div.innerHTML = `
    <p>${method} test to: ${url}<br>
    Response: ${reso}<br>
    Status: ${status}</p>
    `;
    if (status === 200 || status === 201) {
        div.style.backgroundColor = "lime";
    } else {
        div.style.backgroundColor = "tomato";
    }
    document.body.appendChild(div);
}

const tester = async function(url, method, body) {
    if (method === "GET" || !method) {
        let req = new Request(url, {
            method: method
        });
        let resp = await fetch(req);
        let reso = await resp.json();
        printTests(url, method, JSON.stringify(reso), resp.status);
    } else {
        let req = new Request(url, {
            method: method,
            body: JSON.stringify(body),
            headers: {"Content-Type": "application/json"}
        });
        let resp = await fetch(req);
        let reso = await resp.json();
        printTests(url, method, JSON.stringify(reso), resp.status);
    }
}

const methods = ["GET", "POST", "PATCH", "DELETE"];
const GETURLs = [
    "http://localhost:8000/events",
    "http://localhost:8000/events?eventId=65e10aa11c001",
    "http://localhost:8000/events?calId=65e10aa11b001",
    "http://localhost:8000/events?calId=fakeId",
    "http://localhost:8000/event_admins",
    "http://localhost:8000/event_admins?userId=65e10aa11a001&eventId=65e10aa11c001",
    "http://localhost:8000/event_admins?userId=65e10aa11a001",
    "http://localhost:8000/event_admins?eventId=65e10aa11c001",
    "http://localhost:8000/event_admins?eventId=fakeId",
];
//Till endpoint http://localhost:8000/events
const POSTBodiesEvents = [
    {
        date: "2026-01-01", 
        type: "test", 
        name: "test", 
        description: "test", 
        location: "Malmö",
        needsConfirmation: false,
        calId: "65e10aa11b001"
    },
    {
        date: "2026-01-01", 
        type: "test", 
        name: "test", 
        description: "test", 
        location: "Malmö",
        needsConfirmation: false,
        calId: "fakeId"
    },
    {
        date: "2026-01-01", 
        type: "test", 
        name: "test", 
        description: "test", 
        location: "Malmö",
        needsConfirmation: false
    },
];
//Till endpoint http://localhost:8000/event_admins
const POSTBodiesEventAdmins = [
    {
        eventId: "65e10aa11c001",
        userId: "65e10aa11a001",
        canDelete: true,
        canEdit: true,
        isCreator: true
    },
    {
        eventId: "65e10aa11c001",
        userId: "fakeId",
        canDelete: true,
        canEdit: true,
        isCreator: true
    },
    {
        eventId: "65e10aa11c001",
        userId: "65e10aa11a001",
        canDelete: true,
        canEdit: true
    }
];
//Till endpoint http://localhost:8000/events
const PATCHBodiesEvents = [
    {
        eventId: "65e10aa11c001",
        calId: "65e10aa11b001",
        location: "Malmö"
    },
    {
        eventId: "65e10aa11c001",
        calId: "fakeId",
        location: "Malmö"
    },
    {
        eventId: "65e10aa11c001",
        calId: "65e10aa11b001"
    },
]
//Till endpoint http://localhost:8000/event_admins
const PATCHBodiesEventAdmins = [
    {
        eventId: "65e10aa11c001",
        userId: "65e10aa11a001",
        canDelete: false
    },
    {
        eventId: "65e10aa11c001",
        userId: "fakeId",
        canDelete: false
    },
    {
        eventId: "65e10aa11c001",
        userId: "65e10aa11a001"
    },
]
//Till endpoint http://localhost:8000/events
const DELETEBodiesEvents = [
    {
        calId: "65e10aa11b003",
        eventId: "65e10aa11c00a"
    },
    {
        calId: "65e10aa11b003",
        eventId: "fakeId"
    },
    {
        calId: "65e10aa11b003"
    },
]
//Till endpoint http://localhost:8000/event_admins
const DELETEBodiesEventAdmins = [
    {
        eventId: "65e10aa11c005",
        userId: "65e10aa11a003"
    },
    {
        eventId: "65e10aa11c005",
        userId: "fakeId"
    },
    {
        eventId: "65e10aa11c005"
    },
]

const runTests = async function() {
    for (let method of methods) {
        let urls;
        if (method === "GET") {
            urls = GETURLs;
            for (let url of urls) {
                await tester(url, method);
            }
        } else if (method === "POST") {
            for (let body of POSTBodiesEvents) {
                await tester("http://localhost:8000/events", method, body);
            }
            for (let body of POSTBodiesEventAdmins) {
                await tester("http://localhost:8000/event_admins", method, body);
            }
        } else if (method === "PATCH") {
            for (let body of PATCHBodiesEvents) {
                await tester("http://localhost:8000/events", method, body);
            }
            for (let body of PATCHBodiesEventAdmins) {
                await tester("http://localhost:8000/event_admins", method, body);
            }
        } else if (method === "DELETE") {
            for (let body of DELETEBodiesEvents) {
                await tester("http://localhost:8000/events", method, body);
            }
            for (let body of DELETEBodiesEventAdmins) {
                await tester("http://localhost:8000/event_admins", method, body);
            }
        }
    }

    fetch("http://localhost:8000/backup_database").then((resp) => resp.text()).then((reso) => console.log(reso));
    fetch("http://localhost:8000/restore_database").then((resp) => resp.text()).then((reso) => console.log(reso));
}

//runTests();

// fetch("http://localhost:8000/event_admins?eventId=65e10aa11c002", {
//     method: "GET"
// }).then(resp => resp.json()).then(reso => console.log(reso));

// fetch("http://localhost:8000/event_admins?userId=65e10aa11a002", {
//     method: "GET"
// }).then(resp => resp.json()).then(reso => console.log(reso));