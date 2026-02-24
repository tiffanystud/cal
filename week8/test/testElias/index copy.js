// GENERELL TEST-FETCHER 

async function test() {

    let req;
    let response;
    let resource;
    //Test 1
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "GET",
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT1").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 2
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            name: "test",
            email: "test@gmail.com",
            pwd: "123"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT2").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 3
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            email: "test@gmail.com",
            pwd: "123"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT3").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 4
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            name: "test",
            email: "test@gmail.com",
            pwd: "123"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT4").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 5
    req = new Request("http://localhost:8000/users?id=65e10aa11a00a", {
        headers: { "Content-type": "application/json" },
        method: "GET"
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT5").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 6
    req = new Request("http://localhost:8000/users?id=a11a00a", {
        headers: { "Content-type": "application/json" },
        method: "GET"
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT6").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 7
    req = new Request("http://localhost:8000/users?id=65e10aa11a009", {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
            name: "Elias Norrheden(Ändrat namn)",
            pwd: "123(Ändrat)"
        }) 
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT7").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 8
    req = new Request("http://localhost:8000/users", {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
            name: "Elias Norrheden(Ändrat namn)",
            pwd: "123(Ändrat)"
        }) 
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT8").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 9
    req = new Request("http://localhost:8000/users?id=65e10aa11aasd009", {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
            name: "Elias Norrheden(Ändrat namn)",
            pwd: "123(Ändrat)"
        }) 
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT9").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 10
    req = new Request("http://localhost:8000/users?id=65e10aa11a009", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            email: "ivan@example.com",
            pwd: "123(Ändrat)"
        }) 
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT10").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 11
    req = new Request("http://localhost:8000/users?id=65e10aa11a009", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            email: "ivan@example.com",
        }) 
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT11").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 12
    req = new Request("http://localhost:8000/users?id=65e10aa11a008", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            email: "heidi@example.com",
            pwd: "pwdasd9"
        }) 
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT12").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 13
    req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "GET"
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT13").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 14
    req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            userId: "65e10aa152005",
            receiverId: "65e10aa11a002",
            content: "Go bears"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT14").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 15
    req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            userId: "65e10aa152005",
            receiverId: "65e10aa11a002",
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT15").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 16
    req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "POST",
        body: JSON.stringify({
            userId: "65e10aa152005",
            receiverId: "65e10asakjnda11a002",
            content: "Go bears"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT16").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 17
    req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
            privMsgId: "65e10aa152005",
            content: "Uppdate message"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT17").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 18
    req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
            privMsgId: "65e10aa152005",
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT18").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 19
    req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "PATCH",
        body: JSON.stringify({
            privMsgId: "65e10aa15jkn2005",
            content:"Go bear!"
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT19").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 20
     req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            privMsgId: "65e10aa152005",
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT20").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 21
    req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
            privMsgId: "65e10jkkjaa152005",
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT21").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);

    //Test 22
    req = new Request("http://localhost:8000/private_msg", {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({
        })
    });
    response = await fetch(req); 
    resource = await response.json(); 
    document.getElementById("userT22").textContent = `Result: ${JSON.stringify(resource)}, ${response.status}`;
    console.log(resource);
}
test();