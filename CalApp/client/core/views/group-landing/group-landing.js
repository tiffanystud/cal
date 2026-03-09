class GroupLandingView extends HTMLElement {

    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
            <group-description></group-description>
            <week-days></week-days>
            <event-cards></event-cards>
        `;
    }
}