let req = new Request("http://localhost:8000/users", {
    headers: {"Content-type": "application/json"},
    method: "PATCH",
    body: JSON.stringify({
        id:4,
        email: "hejhej@gmail.com"
    })
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));