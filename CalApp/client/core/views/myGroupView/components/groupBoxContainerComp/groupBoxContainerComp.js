export class GroupContainerBoxComp extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({mode : "open"});
        shadowRoot.innerHTML = `
            <style>
                .box {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    background-color: lightgrey;
                }
                .box img {
                    flex: 5;
                    object-fit: cover;
                }
                .groupDetailBox {
                    flex: 3; /* 30% av utrymmet */
                }
                .nextEventBox {
                    flex:2
                }
            </style>

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
