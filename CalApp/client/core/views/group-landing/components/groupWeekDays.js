class GroupWeekDays extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
    }

    html() {
        const event = state.userData.events
        const date = new Date();

        return `
        <div>
            <p>Mån</p>
            <p></p>
        </div>
        <div>
            <p>Tis</p>
            <p></p>
        </div>
        <div>
            <p>Ons</p>
            <p></p>
        </div>
        <div>
            <p>Tors</p>
            <p></p>
        </div>
        <div>
            <p>Fre</p>
            <p></p>
        </div>
        <div>
            <p>Lör</p>
            <p></p>
        </div>
        <div>
            <p>Sön</p>
            <p></p>
        </div>
        
        `;
    }

    style() {
        return `
            div{
                display: flex;
                flex-direction: column;
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