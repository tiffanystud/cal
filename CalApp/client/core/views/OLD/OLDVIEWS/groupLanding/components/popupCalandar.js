class PopupCalendar extends HTMLElement {

    constructor() {

    }

    html() {
        return `
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
                width: 100px;
                height: 100px;
                position: relative;
                backgroundColor = white;
            }
            #weeks {
                display: flex;
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


customElements.define("popup-calendar", PopupCalendar);