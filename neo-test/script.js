let req = new Request("http://localhost:8000/", {
    headers: {"Content-type": "application/json"},
    method: "POST",
    body: JSON.stringify({
        userName: "test",
        pwd: 123,
        email: "mail@mail.com"
    })
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));