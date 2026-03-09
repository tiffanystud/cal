class GroupDescription extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    html() {
        const cal = state.userData.calendar;

        return `
        <div>
            <h1>${cal.name}</h1>
            <p>Klassgrupp för ${cal.name}</p>
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

    render() {
        this.shadowRoot.innerHTML = `
        ${this.html()}
        ${this.style()} 
        `;
    }


}