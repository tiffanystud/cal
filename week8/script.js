let req = new Request("http://localhost:8000/private_msg", {
    headers: {"Content-type": "application/json"},
    method: "DELETE",
    body: JSON.stringify({
        privMsgId: "65e10aa152005",
    })
    
});

fetch(req).then(resp => resp.json()).then(reso => console.log(reso));

/*
body: JSON.stringify({
       "email" : "ivan@example.com",
       "pwd" : "pwd9"
    })
    65e10aa152005
*/