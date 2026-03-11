class WeekDays extends HTMLElement{
    constructor(){
        super();
    };
    connectedCallback(){
        this.render();
    };
    getCurrWeek(){
        let today = new Date();

        const monday = new Date(today);
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
    };

    style(){
        return `
        #week {
            box-sizing: border-box;
            margin: 0;
            height: 72px;
            width: 350px;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .day-cell{
            margin:0;
            font-size: 12px;
            height: 45px;
            display:flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
        .day-cell p{
            margin: 0;
        }
        .today{
            background-color = "blue";
        }
        `;

    }

    render(){
        let weekCal = document.createElement("div");
        weekCal.id = "week";
        let weekdays = getDays();
        for (let day of weekdays){
            let div = document.createElement("div");
            div.classList.add("day-cell");
            if (day.isToday) {
                div.classList.add("today");
            }
            div.innerHTML = `
            <p>${day.label}</p>
            <p>${day.date}</p>
            `;
            weekCal.appendChild(day);
        }
        return weekCal;
    };
}

customElements.define("week-days");
