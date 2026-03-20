import { store } from "../../../store/store.js";

export class FilterCalendars extends HTMLElement{
    constructor(){
        super();
        this.render();

        store.subscribe()
    }
}