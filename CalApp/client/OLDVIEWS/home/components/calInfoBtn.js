export class CalInfoBtn extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode: "open"});
        this.render();
        this.calendar = this.getAttribute("cal");
    }

    setupEvents(){
    const infoBtn = this.shadowRoot.querySelector("#info");

    infoBtn.addEventListener("click", () =>{
        console.log("click");
    })
    }

    render(){
        this.shadowRoot.innerHTML = `
            <style>
                #info{
                    border: none;
                    background: url("../../../../assets/icons/info.png");
                    background-size: 24px;
                    width: 24px;
                    height: 24px;
                }
            </style>
            <button id="info"></button>
        `;

    }
}

customElements.define("cal-info-btn", CalInfoBtn);