

async function test() {

    let req;
    let response;
    let resource;
    //Test 1
    //200 {...} - Alla users
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "GET",
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe1").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);


    //Test 2
    //200 {id: 6, userName: Tomte, pwd: "123", email: "tomte@hotmail.com"}
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            userName: "Tomte",
            pwd: "123",
            email: "tomte@hotmail.com"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe2").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);

    //Test 3
    //400 Missing attributes
    req = new Request("http://localhost:8000/groups", {
        headers: { "Content-type": "application/json" },
        method: "POST"
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe3").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);


    //Test 4
    //200 {id: 4, name: "tomteverkstad"}
    req = new Request("http://localhost:8000/groups", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            name: "Tomteverkstad",
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe4").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);


    //Test 5
    //200 {id: 10, userId: 6, groupId: 4: isAdmin. true}, lägger till 
    req = new Request("http://localhost:8000/users_groups", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            userID: 6,
            groupID: 4,
            isAdmin: true
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe5").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);


    //Test 6-------------------------------------------------
    //200 Alla grupper med groupID
    req = new Request("http://localhost:8000/users_groups?groupID=1", {
        headers: { "Content-type": "application/json" },
        method: "GET",
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe6").textContent = `${response.status} ${JSON.stringify(resource)}`;

    console.log(resource);



    //Test7
    //400 Invalid attributes - id saknas
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
            username: "Nisse",
            pwd: "123",
            email: "nisse@gmail.com"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe7").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);


    //Test 8---------------------------------------
    //200 {id: 6, userName:Tomte, pwd: "123", email: "tomte@gamail.com" }
    req = new Request("http://localhost:8000/users?id=6", {
        headers: { "Content-type": "application/json" },
        method: "GET",
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe8").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);





    //Test 9
    //200 User successfully deleted
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            id: 6,
            pwd: "123",
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe9").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);


    //Test 10
    //200 Group deleted successfully
    req = new Request("http://localhost:8000/groups", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            id: 4,
            name: "Tomteverkstad",
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe10").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);


    //Test 11
    //200 User successfully removed from group
    req = new Request("http://localhost:8000/users_groups", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            userID: 6,
            groupID: 4
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("testRe11").textContent = `${response.status} ${JSON.stringify(resource)}`;
    console.log(resource);
}

// Anropa funktionen
test();
