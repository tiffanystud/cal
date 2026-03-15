export class GroupWeekDays extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();

        // Här ska den subscriba till alla events
    }

    html() {
        const event = state.userData.events
        const date = new Date();
        const weekDays = ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"];

        return `
        <div id="weekDaysOuter">
            div id="Monday">
                <p>Mån</p>
                <p></p>
            </div>
            <div id="Tuesday">
                <p>Tis</p>
                <p></p>
            </div>
            <div id="Wednesday">
                <p>Ons</p>
                <p></p>
            </div>
            <div id="Thursday">
                <p>Tors</p>
                <p></p>
            </div>
            <div id="Friday">
                <p>Fre</p>
                <p></p>
            </div>
            <div id="Saturday">
                <p>Lör</p>
                <p></p>
            </div>
            <div id="Sunday">
                <p>Sön</p>
                <p></p>
            </div>
        </div>
        `;
    }

    style() {
        return `
            #weekDaysOuter {
                display: flex;
            }

            #weekDaysOuter div{
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

customElements.define("week-days", GroupWeekDays);