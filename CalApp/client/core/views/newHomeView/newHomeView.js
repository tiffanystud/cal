

class CreateGroupLandingView {

    constructor() {
        this.app = document.querySelector("#app");
        this.sub();
    }

    sub() {
        PubSub.subscribe("change:view", (data) => {
            if (data.url.pathname === "/newHomeViewTest") {
                this.render();
            }
        })
    }




    render() {
        this.app.innerHTML = `
        <style>
            #app {
                display: flex;
                flex-direction: column;
                gap: 50px;
            }
        </style>
            <filter-cals></filter-cals>
            <week-days></week-days>
            <event-cards></event-cards>
            <bottom-nav></bottom-nav>
        `;
    }


}


new CreateGroupLandingView();