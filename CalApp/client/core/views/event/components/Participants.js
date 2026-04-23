class Participants extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: open });
        this.participants;
    }

    connectedCallback() {
        this.subs();
        this.render();
        this.eListeners();
    }

    disconnectedCallback() {
        // Unsubscriba ??
    }

    subs() {
        PubSub.subscribe(EVENTS.DATA.RETURNED.EVENTSRSVP, (data) => {
            this.participants = data.isGoing;
        })

    }

    getValue() {

    }

    setValue() {

    }

    eListeners() {

    }


    render() {
        this.shadowRoot.innerHTML = `
        <style></style>

        

        
        `
    }


}




