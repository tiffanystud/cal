
export class CreateGroupView {
    
    constructor() {
        this.app = document.querySelector("#app");
        this.subs();
    }
    
    subs () {
        
        PubSub.subscribe("change:view", (data) => {
            if (data.mainPath == "createGroup") {
                this.render();
            }
        })
        
        
    }
    
    render() {
        this.app.innerHTML = `

            <div class="create-popup-container">
        
                <h3 class="create-popup-title">Create</h3>
                
                <div class="content-div">
                    
                    <div class="create-btn create-event">
                        <p class="create-event-title">New Personal Event</p>
                        <p class="button-arrow">></p>
                    </div>  
                    
                    <div class="create-btn create-group">
                        <p class="create-event-group">New Group</p>
                        <p class="button-arrow">></p>
                    </div>  
                    
                </div>
            </div>`
        }
    
}