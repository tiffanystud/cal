let req = new Request("http://localhost:8000/users_groups", {
    headers: {"Content-type": "application/json"},
    method: "POST",
    body: JSON.stringify({
        userID: 1,
        groupID: 5,
    })
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));