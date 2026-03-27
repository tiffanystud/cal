import { PubSub } from "../../../store/pubsub.js";
import { store } from "../../../store/store.js";

export class SearchTags extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.selectedTags = [];
        this.render();
        this.eventListeners();
    }

    html() {
        return `
        <div id="tagsFilter">
            <div id="searchBtn">Search tags</div>
            <div id="selectedTags"></div>
        </div>
        `
    }

    style() {
        return `
            <style>
                #tagsFilter {
                    display: flex;
                    flex-direction: column;
                    gap: 5px;
                }
                #searchBtn {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    height: 35px;
                    cursor: pointer;
                    background-color: white;
                }
                #selectedTags {
                    display: flex;
                    gap: 10px;
                }
                .tags {
                background-color: white;
                padding: 10px;
                border-radius: 10px;
                }
            </style>
        `

    }

    eventListeners() {
        this.shadowRoot.querySelector("#searchBtn").addEventListener("click", () => {
            PubSub.publish("Tags::OpenSearchModal");
        })

        PubSub.subscribe("Users::Selected", data => {
            // data.selectedItem
            // data.context

            store.setState({ "selectedTags": [...store.getState().selectedTags, data.selectedItem] });

            let currentEvents = store.getState().selectedEvents;

            let filteredEvents;

            for (let tags of store.getState().selectedTags) {
                filteredEvents = currentEvents.filter(event => event.tags == tags);
            }

            store.setState({ "selectedEvents": filteredEvents });

            let tagsDiv = document.createElement("div");
            tagsDiv.classList.add("tags");
            tagsDiv.innerHTML = data.selectedItem;
            const closeBtn = document.createElement("button");
            closeBtn.classList.add("closeBtn");
            closeBtn.innerHTML = "&times;";
            tagsDiv.appendChild(closeBtn);
            this.shadowRoot.querySelector("#selectedTags").appendChild(tagsDiv);


            closeBtn.addEventListener("click", () => {
                store.setState({ "selectedEvents": currentEvents });
                let newTags = store.getState().selectedTags.filter(tag => tag != data.selectedItem);
                store.setState({ "selectedTags": newTags })
                // PubSub.publish("SELECTEDCALS.EVENTS.STATE.POST", state.selectedCals);
                tagsDiv.remove();
            })

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