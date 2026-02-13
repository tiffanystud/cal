let req = new Request("http://localhost:8000/users", {
    headers: {"Content-type": "application/json"},
    method: "POST",
    body: JSON.stringify({
        pwd: "hohoho",
        email: "tomte@gmail.com"
    })
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));