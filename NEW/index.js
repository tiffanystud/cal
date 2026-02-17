// let response = fetch("http://localhost:8000/User?userName=Philles");
// response.then(response => response.json()).then(response => console.log(response));


let response = fetch("http://localhost:8000/User", {
    method: "DELETE",
    body: JSON.stringify({ userId: 2, userName: "Linus", password: "Hejhej", email: "hejhej@" }),
    headers: {
        "Content-Type": "application/json"
    }
});
response.then(response => response.json()).then(response => console.log(response));