class EventHeader extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: open });
    }

    connectedCallback() {
        this.subs();
        this.render();
        this.eListeners();
    }

    disconnectedCallback() {

    }

    subs() {

    }
    getValue() {

    }

    setValue() {

    }

    eListeners() {

    }

    render() {

    }


}