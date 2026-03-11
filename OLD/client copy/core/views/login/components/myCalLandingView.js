class MyCalLandingView extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.render();
    }

    render() {
        this.innerHTML = `
            <week-days></week-days>
            <h5>Upcoming Events</h5>
            <event-cards></event-cards>
        `;
    }
}

customElements.define("my-calendar");