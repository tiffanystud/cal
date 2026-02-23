
async function test() {

    let req;
    let response;
    let resource;
    //Test 1
    req = new Request("http://localhost:8000/calendars", {
        headers: { "Content-type": "application/json" },
        method: "GET",
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT1").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 2
    req = new Request("http://localhost:8000/calendars", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            userId: "1",
            name: "Testgroup",
            type: "public"
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT2").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 3
    req = new Request("http://localhost:8000/calendars", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            userId: "1",
            type: "public"
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT3").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 4
    req = new Request("http://localhost:8000/calendars", {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
            id: "65e10aa11b001",
            calId: "3",
            userId: "1",
            name: "newNameGroup"
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 5
    req = new Request("http://localhost:8000/calendars", {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
            userId: "1",
            name: "newNameGroup"
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 6
    req = new Request("http://localhost:8000/calendars", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            id: "65e10aa11b005",
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    req = new Request("http://localhost:8000/calendars", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            userId: "1",
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);


    //Test 7
    req = new Request("http://localhost:8000/calendars?calId=1", {
        headers: { "Content-type": "application/json" },
        method: "GET"
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT5").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 8
    req = new Request("http://localhost:8000/calendars?calId", {
        headers: { "Content-type": "application/json" },
        method: "GET"
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT5").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);



    // pinned_calendars

    //Test 1

    req = new Request("http://localhost:8000/users_pinned_calendars", {
        headers: { "Content-type": "application/json" },
        method: "GET"
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT5").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);


    //Test 2
    req = new Request("http://localhost:8000/users_pinned_calendars", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            userId: "1",
            calId: "3"
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);


    //Test 3

    req = new Request("http://localhost:8000/users_pinned_calendars", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            userId: "1",
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);


    // Test 4 

    req = new Request("http://localhost:8000/users_pinned_calendars", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            id: "65e10aa11e005",
            userId: "165e10aa11a005",
            calId: "65e10aa11b005"
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    // Test 5

    req = new Request("http://localhost:8000/users_pinned_calendars", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            id: "1",
            userId: "1"
        })
    });
    response = await fetch(req);
    resource = await response.json();
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

}
test();