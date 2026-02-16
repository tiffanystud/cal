let req = new Request("http://localhost:8000/users", {
    headers: {"Content-type": "application/json"},
    method: "GET",
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));