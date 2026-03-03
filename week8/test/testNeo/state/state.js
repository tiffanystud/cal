const logIn = document.querySelector("#log-in");
const darkMode = document.querySelector("#dark-mode");
const logOut =  document.querySelector("#log-out");
const usrName = document.querySelector("#usrName");
const pwd = document.querySelector("#pwd");
const store = createStore({ usrName: null, pwd: null, isLoggedIn: false, darkMode: false, cals: []});

class Calendar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <h2>${this.data.name}</h2>
        <p>${this.data.type} calendar</p>
        <p>Events:</p>
        `;
        this.style.backgroundColor = "yellow";
        this.style.padding = "10px";
        this.style.borderRadius = "10px";
        this.style.display = "block";
    }
}

customElements.define("calendar-box", Calendar);

store.subscribe("log", (state) => {
  console.log("State changed:", state);
});

if (store.getState().darkMode) {
    document.body.style.backgroundColor = "gray";
}

darkMode.addEventListener("click", () => {
    if (!store.getState().darkMode) {
        store.setState({usrName: store.getState().usrName, pwd: store.getState().pwd, isLoggedIn: store.getState().isLoggedIn, darkMode: true, cals: store.getState().cals}, ["log"]);
        document.body.style.backgroundColor = "gray";
    } else {
        store.setState({usrName: store.getState().usrName, pwd: store.getState().pwd, isLoggedIn: store.getState().isLoggedIn, darkMode: false, cals: store.getState().cals}, ["log"]);
        document.body.style.backgroundColor = "white";
    }
})

logIn.addEventListener("click", async () => {
    let resp = await fetch("http://localhost:8000/users");
    let reso = await resp.json();
    
    let userFound = false;
    for (let user of reso) {
        document.querySelector("#status").style.display = "none";

        if (user.name === usrName.value && user.pwd === pwd.value) {
            let usersCalsResp = await fetch(`http://localhost:8000/users_calendars?userId=${user.id}`);
            let usersCalsReso = await usersCalsResp.json();
            let calsResp = await fetch(`http://localhost:8000/calendars`);
            let calsReso = await calsResp.json();
            for (let userCal of usersCalsReso) {
                for (let cal of calsReso) {
                    if (userCal.calId === cal.id) {
                        store.getState().cals.push(cal);
                    }
                }
            }
            store.setState({usrName: user.name, pwd: user.pwd, isLoggedIn: true, darkMode: store.getState().darkMode, cals: store.getState().cals}, ["log"]);
            logOut.style.display = "inline";
            userFound = true;
            break;
        }
    }
    if (!userFound) {
        document.querySelector("#status").textContent = "Incorrect username or password, try again"; 
        return;
    }

    if (store.getState().isLoggedIn) {
        document.querySelector("div").style.display = "block";
    }

    for (let cal of store.getState().cals) {
        let div = document.createElement("calendar-box");
        div.data = cal;
        let resp = await fetch(`http://localhost:8000/events?calId=${cal.id}`);
        let reso = await resp.json();
        console.log(reso);
        //document.querySelector("#cals").appendChild(div);
    }
});

logOut.addEventListener("click", () => {
    logOut.style.display = "none";
    document.querySelector("#status").textContent = "Successfully logged out!";
    document.querySelector("#status").style.display = "block";
    document.querySelector("div").style.display = "none";
    document.querySelector("#cals").innerHTML = "";
    store.setState({ usrName: null, pwd: null, isLoggedIn: false, darkMode: store.getState().darkMode, cals: []}, ["log"]);
});