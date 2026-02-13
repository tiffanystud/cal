let req = new Request("http://localhost:8000/groups", {
    headers: {"Content-type": "application/json"},
    method: "PATCH",
    body: JSON.stringify({
        name:"VIP",
        groupID: 1
    })
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));