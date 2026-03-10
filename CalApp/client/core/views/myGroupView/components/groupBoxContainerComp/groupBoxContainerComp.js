export class GroupContainerBoxComp extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode : "open"});

        shadowRoot.innerHTML = `
            <link rel="stylesheet" href="style.css">

            <div class="box">
                <img src="" alt="Group image">
                <div class="groupDetailBox">
                    <h3>Hello world</h3>
                    <p>Detta är beskrivningen på gruppen</p>
                    <p>X antal members</p>
                </div>
                <div class="nextEventBox">
                    <p>Next event</p>
                    <p>X</p>
                </div>
            </div>

        `
    }
   

}
