let req = new Request("http://localhost:8000/users?id=65e10aa11a009", {
    headers: {"Content-type": "application/json"},
    method: "DELETE",
    body: JSON.stringify({
       "email" : "ivan@example.com",
       "pwd" : "pwd9"
    })
    
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));

/*

*/