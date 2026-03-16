export class GroupWeekDays extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();

        // Här ska den subscriba till alla events
    }

    weekDays(dayName) {
        let date = new Date();
        const array = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];

        for (let i = 0; i < array.length; i++) {
            if (array[i] == dayName) {
                return date.getDate() + i;
            }

        }

    }

    html() {
        // const event = state.userData.events
        // const date = new Date();


        return `
        <div id="weekDaysOuter">
            <div id="Monday">
                <p>Mån</p>
                <p>${this.weekDays("Måndag")}</p>
            </div>
            <div id="Tuesday">
                <p>Tis</p>
                <p>${this.weekDays("Tisdag")}</p>
            </div>
            <div id="Wednesday">
                <p>Ons</p>
                <p>${this.weekDays("Onsdag")}</p>
            </div>
            <div id="Thursday">
                <p>Tors</p>
                <p>${this.weekDays("Torsdag")}</p>
            </div>
            <div id="Friday">
                <p>Fre</p>
                <p>${this.weekDays("Fredag")}</p>
            </div>
            <div id="Saturday">
                <p>Lör</p>
                <p>${this.weekDays("Lördag")}</p>
            </div>
            <div id="Sunday">
                <p>Sön</p>
                <p>${this.weekDays("Söndag")}</p>
            </div>
        </div>
        `;
    }

    style() {
        return `
        <style>
            #weekDaysOuter {
                display: flex;
            }

            #weekDaysOuter div{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
        </style>
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