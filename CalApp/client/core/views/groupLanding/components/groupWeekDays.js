export class GroupWeekDays extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();

        // Här ska den subscriba till alla events
    }

    weekDays(dayName) {
        let date = new Date();
        const array = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        for (let i = 0; i < array.length; i++) {
            if (array[i] == dayName) {
                return date.getDate() + i;
            }
        }

    }

    monthDays() {
        // Måste kunna skriva ut alla datum för månaden typ!
    }

    highLightToday() {
        let date = new Date();
        const array = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const weekDate = this.shadowRoot.querySelector(`#${array[date.getDay() - 1]}`)

        if (weekDate) {
            weekDate.style.backgroundColor = "blue";
        }
    }

    html() {
        // const event = state.userData.events
        // const date = new Date();


        return `

        <div id="weekDaysOuter">
            <div id="Monday">
                <p>Mån</p>
                <p>${this.weekDays("Monday")}</p>
            </div>
            <div id="Tuesday">
                <p>Tis</p>
                <p>${this.weekDays("Tuesday")}</p>
            </div>
            <div id="Wednesday">
                <p>Ons</p>
                <p>${this.weekDays("Wednesday")}</p>
            </div>
            <div id="Thursday">
                <p>Tors</p>
                <p>${this.weekDays("Thursday")}</p>
            </div>
            <div id="Friday">
                <p>Fre</p>
                <p>${this.weekDays("Friday")}</p>
            </div>
            <div id="Saturday">
                <p>Lör</p>
                <p>${this.weekDays("Saturday")}</p>
            </div>
            <div id="Sunday">
                <p>Sön</p>
                <p>${this.weekDays("Sunday")}</p>
            </div>
        </div>

         <div id="calWindow">
            <div class="weeks">
                <div class="Monday"></div>
                <div class="Tuesday"></div>
                <div class="Wednesday"></div>
                <div class="Thursday"></div>
                <div class="Friday"></div>
                <div class="Saturday"></div>
                <div class="Sunday"></div>
            </div>
            <div class="weeks"></div>
            <div class="weeks"></div>
            <div class="weeks"></div>
        </div>
        `;
    }

    style() {
        return `
        <style>
            #calWindow {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 200px;
                position: relative;
                background-color: white;
            }
            #weeks {
                display: flex;
                justify-content: center;
                align-items: center;
            }


            #weekDaysOuter {
                display: flex;
                justify-content: center;
                gap: 25px;
                background-color: white;
                border-radius: 10px;
                padding: 15px;
            }

            #weekDaysOuter div{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                gap: 15px;
            }
            p {
                margin: 0;
            }
            
        </style>
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.html()}
            ${this.style()}
        `;
        this.highLightToday();
    }

}

customElements.define("week-days", GroupWeekDays);