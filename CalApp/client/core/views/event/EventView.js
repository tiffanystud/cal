class EventView {

    constructor() {
        this.renderHTML();
    }

    subs() {
        // Här att den subar på när den ska öppnas med rätt div osv
    }

    renderHTML() {
        let contentDiv = document.querySelector("#content");

        contentDiv.innerHTML = `
            <event-header></event-header>
            <event-body></event-body>
            <event-footer></event-footer>
        `;

    }



}