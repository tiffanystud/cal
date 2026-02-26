class Circle extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.title = "Cool circle";
        this.style.borderRadius = "50%";
        this.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        this.style.display = "flex";
        this.style.justifyContent = "center";
        this.style.alignItems = "center";
        this.style.height = "100px";
        this.style.padding = "10px";
        this.addEventListener("click", () => {
            let circle = document.createElement("cool-circle");
            document.querySelector("#circles").appendChild(circle);
        });
        this.innerHTML = `
        <p> Random num: ${Math.floor(Math.random() * 100)}<br>Click me!</p>
        `;
    }
}

customElements.define("cool-circle", Circle);

let circle = document.createElement("cool-circle");
document.querySelector("#circles").appendChild(circle);