class GroupDescription extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        store.subscribe("store:selected:calendar", function () {
            this.render(calendar);
        })
    }

    html(calendar) {
        return `
        <div>
            <h1>${calendar.name}</h1>
            <p>Klassgrupp för ${calendar.name}</p>
        </div>
        `;
    }

    style() {
        return `
        div {
            display: flex;
            justify-content: center;
            align-items: center;
        }
        `;
    }

    render(calendar) {
        this.shadowRoot.innerHTML = `
        ${this.html(calendar)}
        ${this.style()} 
        `;
    }


}