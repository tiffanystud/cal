let req = new Request("http://localhost:8000/users?id=1", {
    headers: {"Content-type": "application/json"},
    method: "GET"
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));