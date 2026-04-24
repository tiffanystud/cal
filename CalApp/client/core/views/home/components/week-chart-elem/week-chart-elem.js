
// Not POPUP

export class WeekChartElem extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    getCurrWeek() {
        
        let today = new Date();
        const monday = new Date(today);
        const day = monday.getDay();
        const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
        monday.setDate(diff + 0 * 7);

        const week = [];

        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            week.push({
                label: d.toLocaleDateString("en", { weekday: "short" }),
                date: d.getDate(),
                iso: d.toISOString().split("T")[0],
                isToday: d.toDateString() === today.toDateString()
            });
        }

        return week;
        
    }

    createWeekCells() {

        const weekdays = this.getCurrWeek();
        let html = ``;

        for (let day of weekdays) {
            if (day.isToday) {
                html += `
                    <div class="day-cell" id="today">
                        <p>${day.label}</p>
                        <p>${day.date}</p>
                    </div>
                `;
            } else {
                html += `
                    <div class="day-cell">
                        <p>${day.label}</p>
                        <p>${day.date}</p>
                    </div>
                `;
            }
        }
        
        return html;
        
    }
    
    render() {

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }
                #week {
                    box-sizing: border-box;
                    margin: 0;
                    height: 72px;
                    width: 350px;
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                }
                .day-cell {
                    margin:0;
                    font-size: 12px;
                    height: 40px;
                    padding: 4px;
                    display:flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .day-cell p{
                    margin: 0;
                }
                #today{
                    padding: 0 4px;
                    border-radius: 4px;
                    background-color: #9ccea9;
                    border: 1px solid #84b291;
                }
            </style>
            
            <div id="week">${this.createWeekCells()}</div>
            
        `;

    }
    
}

customElements.define("week-chart-elem", WeekChartElem);