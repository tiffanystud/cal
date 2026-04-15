class Participants extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: open });
        this.eventData;
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

        PubSub.subscribe(EVENTS.DATA, (data) => {
            this.eventData = data;
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




