import { PubSub } from "../../../store/pubsub.js";

export class SearchTags extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.render();
        this.eventListeners();
    }

    html() {
        return `
        <div id="tagsFilter">
            <div id="searchBtn">Search tags</div>
            <div id="selectedTags">hej</div>
        </div>
        `
    }

    style() {
        return `
            <style>
                #tagsFilter {
                    display: flex;
                    flex-direction: column;
                }
                #searchBtn {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 35px;
                    cursor: pointer;
                    background-color: white;
                }
            </style>
        `

    }

    eventListeners() {
        this.shadowRoot.querySelector("#searchBtn").addEventListener("click", () => {
            PubSub.publish("Tags::OpenSearchModal");

        })
    }

    render() {
        this.shadowRoot.innerHTML = `
            ${this.style()}
            ${this.html()}
        `
    }




}


customElements.define("search-tags", SearchTags);