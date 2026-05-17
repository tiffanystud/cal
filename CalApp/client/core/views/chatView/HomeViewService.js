import { PubSub } from "../../store/Pubsub.js";
import { EVENTS } from "../../store/Events.js";
import { Router } from "../../router/Router.js";
import { HomeView } from "./HomeView.js";

//COMPONENTS
// loadingScreen (between popups and views etc)
import "./components/week-chart-elem/week-chart-elem.js"
import "./components/filter-cals-elem/filter-cals-elem.js"


/* OBS 
- DENNA MÅSTE UNLOADAS SÅ ALLA UNSUBS SKER?? I ALLA SERVICES OCH COMPS *** 
 */

export class HomeViewService {

    constructor() {

        // DEVELOPMENT
        this.data = {
            allCalendars: null,
            allUGs: null,
            usersFilteredCals: null
        };

        this.subs();
        // this.eListeners();
    }

    subs() {

        // VIEW-SPECIFIC
        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.ANY, (data) => {
            if (data.mainPath == "home") {
                // Show (!loggedIn || loggedIn) home view
                // Hur triggar vi event/pub-loop med ID härifrån?
                HomeView.renderHTML(this.isLoggedIn);
            } else {
                // Om vyn byts (OBS MÅSTE VARA DET GLOB. PRAC. SÅ ALLA VYER BYTS PÅ DETTA SÄTT)
                // Intern rerendering kan ske med EVENTS.VIEW.PAGE.SHOW.HOME (eller annat alt?)
                // unsub();
            }
        })

        PubSub.subscribe(EVENTS.AUTH.LOGIN.SUCCESS, () => {
            this.isLoggedIn = true;
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME);
        });

        PubSub.subscribe(EVENTS.AUTH.LOGOUT.SUCCESS, () => {
            this.isLoggedIn = false;
            PubSub.publish(EVENTS.VIEW.PAGE.SHOW.HOME);
        });

        PubSub.subscribe(EVENTS.VIEW.PAGE.SHOW.HOME, () => {
            // Show (!loggedIn || loggedIn) home view
            HomeView.renderHTML(this.isLoggedIn);
            if (this.isLoggedIn) eListeners();
        });

        // COMPONENT-SPECIFIC, REMINDER: some needs to be unsubbed when view changes
        this.unsubReqCalendars = PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.CALENDARS.GET, (allCals) => {
            this.data.allCalendars = allCals;
            this.tryBuildUserCalendars();
        });

        PubSub.subscribe(EVENTS.RESOURCE.RECEIVED.USERSCALENDARS.GET, (allUGs) => {
            this.data.allUGs = allUGs;
            this.tryBuildUserCalendars();
        });


        /* this.unsubSelectedCalendars = PubSub.subscribe(EVENTS.DATA.SELECTED.CALENDARS, function (data) {

            if (!this.selectedCalendars) this.selectedCalendars = data;

            const newSelCal = [];
            this.selectedCalendars.forEach(cal => {
                newSelCal.push(cal)
            });
            data.forEach(cal => {
                newSelCal.push(cal);
            })

            this.selectedCalendars = newSelCal;

        })

        this.unsubSelectedEvents = PubSub.subscribe(EVENTS.DATA.SELECTED.EVENTS, function (data) {

            if (!this.selectedEvents) return this.selectedEvents = data;

            const newSelEvents = [];
            this.selectedEvents.forEach(event => {
                newSelEvents.push(event)
            });
            data.forEach(event => {
                newSelEvents.push(event);
            })

            this.selectedEvents = newSelEvents;

        })

        this.unsubSelectedTags = PubSub.subscribe(EVENTS.DATA.SELECTED.EVENTS, function (data) {

            if (!this.selectedTags) return this.selectedTags = data;

            const newSelTag = [];
            this.selectedTags.forEach(tag => {
                newSelTag.push(tag)
            });
            data.forEach(tag => {
                newSelTag.push(tag);
            })

            this.selectedTags = newSelTag;

        })
            
        */
    }

    unsub() {
        if (this.unsubSelectedCalendars) this.unsubSelectedCalendars();
        if (this.unsubSelectedEvents) this.unsubSelectedEvents();
        if (this.unsubSelectedTags) this.unsubSelectedTags();
    }

    setURL(newURL) {
        Router.updateUrl(newURL);
    }

    eListeners() {

        /*      
        const notificationsBar = document.querySelector("notifications-bar");
        const detailContainer = document.querySelector("detail-container");
        const filterCals = document.querySelector("filter-cals"); 
        */
        const createPopup = document.querySelector("create-popup");
        const eventCardPopup = document.querySelector("event-card-popup");

        createPopup.addEventListener("click", () => {
            // Trigger popup-rendering ***
            PubSub.publish(EVENTS.VIEW.POPUP.SHOW.TEST1);
        });

        eventCardPopup.addEventListener("click", () => {
            const id = "getIDfromSomewhere"
            const url = "/events?id="
            this.setURL(`${url}${id}`); // Måste resettas sen -> se över ***
            // Trigger popup-rendering ***
            PubSub.publish(EVENTS.VIEW.POPUP.SHOW.TEST2);
        });

    }

    // DEVELOPMENT
    tryBuildUserCalendars() {
        if (!this.data.allCalendars || !this.data.allUGs) return;

        const dummyUserId = "65f3aa11a01e";

        const userUGs = this.data.allUGs.filter(ug => ug.userId === dummyUserId);
        const filteredCals = this.data.allCalendars.filter(cal =>
            userUGs.find(ug => ug.calId === cal.id)
        );

        this.data.usersFilteredCals = filteredCals;

        PubSub.publish(EVENTS.DATA.SELECTED.CALENDARS, filteredCals);
    }


    loadSelectedData(data) {

        if (data = "") {
            PubSub.publish(EVENTS.DATA.SELECTED.CALENDARS, data, false)
        } else if (data = "") {
            PubSub.publish(EVENTS.DATA.SELECTED.EVENTS, data, false)
        } else if (data = "") {
            PubSub.publish(EVENTS.DATA.SELECTED.CALENDARS, data, false)
        }

    }

} 

new HomeViewService();