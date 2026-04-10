import { PubSub } from "../../../store/pubsub.js";

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

        // for (let i = 0; i < array.length; i++) {
        //     if (array[i] == dayName) {
        //         return date.getDate() + i;
        //     }
        // }

        for (let i = 0; i < array.length; i++) {
            if (dayName == array[i]) {
                // Typ räkna ut diffen här? Kolla över!
                if (dayName != array[date.getDay() - 1]) {
                    let diff = i - (date.getDay() - 1);
                    return date.getDate() + diff;
                }
                return date.getDate();
            }
        }

    }

    monthDays() {
        // Måste kunna skriva ut alla datum för månaden typ!

    }

    highLightToday() {
        const date = new Date();
        // const array = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

        const datesToday = this.shadowRoot.querySelectorAll(`.day-${date.getDate()}`)

        for (let day of datesToday) {
            day.style.border = "3px solid blue";
            day.style.borderRadius = "10px";
            day.style.padding = "5px";

        }
    }

    weekDaysHtml() {
        // const event = state.userData.events
        const date = new Date();

        return `
        <div id="weekDaysOuter">
            <div id="Monday" class="day-${this.weekDays("Monday")}">
                <p>Mon</p>
                <p>${this.weekDays("Monday")}</p>
            </div>
            <div id="Tuesday" class="day-${this.weekDays("Tuesday")}">
                <p>Tue</p>
                <p>${this.weekDays("Tuesday")}</p>
            </div>
            <div id="Wednesday" class="day-${this.weekDays("Wednesday")}">
                <p>Wed</p>
                <p>${this.weekDays("Wednesday")}</p>
            </div>
            <div id="Thursday" class="day-${this.weekDays("Thursday")}">
                <p>Thu</p>
                <p>${this.weekDays("Thursday")}</p>
            </div>
            <div id="Friday" class="day-${this.weekDays("Friday")}">
                <p>Fri</p>
                <p>${this.weekDays("Friday")}</p>
            </div>
            <div id="Saturday" class="day-${this.weekDays("Saturday")}">
                <p>Sat</p>
                <p>${this.weekDays("Saturday")}</p>
            </div>
            <div id="Sunday" class="day-${this.weekDays("Sunday")}">
                <p>Sun</p>
                <p>${this.weekDays("Sunday")}</p>
            </div>
        </div>
        `;

    }

    calWindowHtml() {
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let lastMonthDay = new Date(2026, 1 + new Date().getMonth(), 0).getDate();
        let allHtml = "";
        for (let i = 1; i <= lastMonthDay; i++) {
            allHtml += `
            <div class="weeks">
                <div class="days day-${i}">${i}</div>
            </div>
            `
        }
        return `
        <div id ="calWindow">
            <p>${months[new Date().getMonth()]}</p>
            <div id="calDates">
                ${allHtml}
            </div>
        </div>`
    }

    style() {
        return `
        <style>
        #calWindow {
            display: none;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: white;
            height: 200px;
        }
        #calDates {
            display: flex;
            flex-wrap: wrap;
            gap: 22px;
            align-items: center;
            justify-content: center;
            padding: 10px;
            
            position: relative;
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
            cursor: pointer;
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

    eventListeners() {
        const calWindow = this.shadowRoot.querySelector("#calWindow");
        this.shadowRoot.querySelector("#weekDaysOuter").addEventListener("click", () => {
            const calWindowStyle = getComputedStyle(calWindow);
            if (calWindowStyle.display == "none") {
                calWindow.style.display = "flex";
            } else {
                calWindow.style.display = "none";
            }
        })

        const allDatesCalWindow = this.shadowRoot.querySelectorAll("days");
        for (let date of allDatesCalWindow) {
            date.addEventListener("click", () => {
                PubSub.publish("change:date", {
                    selectedDate: date.classList
                })
            })
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.weekDaysHtml()}
            ${this.calWindowHtml()}
            ${this.style()}
        `;
        this.highLightToday();
        this.eventListeners();
    }

}

customElements.define("week-days", GroupWeekDays);