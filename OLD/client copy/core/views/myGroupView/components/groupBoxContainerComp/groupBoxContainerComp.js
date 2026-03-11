export class GroupContainerBoxComp extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode : "open"});
        this.shadowRoot.innerHTML = `
            <style>
                .box {
                    display: flex;
                    flex-direction: column;
                    background-color: lightgrey;
                    padding: 10px;
                    border: 1px solid black;
                }
                .box img {
                    background-color: yellow;
                    height: 80px;
                }
                .groupDetailBox {
                    
                }
                .nextEventBox {
                    
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
                    <h4>Next event</h4>
                    <p>X</p>
                </div>
            </div>
        `
    }

}
