class Event extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        this.innerHTML = `
        <h2>${this.data.name}</h2>
        <p>${this.data.description}</p>
        <p>Location: ${this.data.location}</p>
        `;
        if (this.data.type === "lecture") {
            this.style.backgroundColor = "burlywood";
        } else if (this.data.type === "deadline") {
            this.style.backgroundColor = "tomato";
        } else if (this.data.type === "aw") {
            this.style.backgroundColor = "lightblue";
        } else {
            this.style.backgroundColor = "gray";
        }
        this.style.display = "block";
        this.style.padding = "10px";
        this.style.borderRadius = "10px";
    }
}

customElements.define("event-box", Event);

async function test() {
    try {
        let resp = await fetch("http://localhost:8000/events");
        let reso = await resp.json();

        for (let event of reso) {
            let e = document.createElement("event-box");
            e.data = event;
            document.querySelector("#events").appendChild(e);
        }
    } catch (e) {
        console.log(e.message);
    }
}

test();
