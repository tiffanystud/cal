import { PubSub } from "../store/pubsub.js";
import { store } from "../store/store.js";

export class HomeService {


    constructor() {
        // Just nu blir calList ett objekt och inte array, se över!
        PubSub.subscribe("SELECTEDCALS.EVENTS.STATE.POST", cal => {
            store.setState({
                "selectedCals": [...store.getState().selectedCals, cal]
            });
            this.addSelectedEvents(cal);
        })
        
        PubSub.subscribe("SELECTEDCALS.EVENTS.STATE.DELETE", cal => {
            store.setState({
                "selectedCals": store.getState().selectedCals.filter(cals => cals.id != cal.id)
            });
            this.deleteSelectedEvents(cal);
        })
    }

    addSelectedEvents(cal) {
        let state = store.getState();
        let allCals = state.selectedEvents;
        // for (let cal of calList) {
        let events = state.events.filter(event => cal.id == event.calId)
        for (let event of events) {
            allCals.push(event);
        }
        // }
        store.setState({
            "selectedEvents": allCals
        });
        // När notify kommer igenom, ska det ske en setState här för calEvent
    }

    deleteSelectedEvents(cal) {
        let state = store.getState();
        let allCals = state.selectedEvents;

        let cleanSelectEventArray = allCals.filter(event => cal.id != event.calId);

        store.setState({
            "selectedEvents": cleanSelectEventArray
        });
    }


}

new HomeService();