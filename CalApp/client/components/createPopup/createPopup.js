
export class CreatePopup {
    
    constructor() {
        this.app = document.querySelector("#app");
        this.subs();
    }
    
    subs () {
        
                    PubSub.publish("change:page", {
                        page: "myCal"
                    })
        PubSub.subscribe("change:view", (data) => {
            
            if (data = "createEvent") {
                PubSub.publish("change:view", {
                        page: "myCal"
                })
            }
            if (data = "createGroup") {
                PubSub.publish("change:view", {
                        page: "myCal"
                })
            }
        })
     
    }
    
    render() {
        
        this.app.innerHTML = `
        
            <style>
                .create-popup-container {
                    background-color: lightblue;
                    padding: 20px 40px;
                }
                
                .create-popup-container {
                    background-color: lightblue;
                    padding: 20px;
                    border-radius: 20px 20px 0 0;
                }
                
                .content-div {
                display: flex;
                flex-direction: column;
                gap: 10px; 
                }
                
                .create-btn {
                display: flex;
                padding: 5px 8px;
                border-radius: 5px;
                justify-content: space-between;
                background-color: blanchedalmond; 
                }
                
                
                .create-btn:hover {
                    cursor: pointer;
                }
                
            </style>
        
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
            </div>`;
        
        const eventBtn = document.querySelector(".create-event");
        const groupBtn = document.querySelector(".create-group");
        
        eventBtn.addEventListener("click", () => {
            PubSub.publish('change:view', {
                page: 'createEvent'
            });
        })
        
        groupBtn.addEventListener("click", () => {
            PubSub.publish('change:view', {
                page: 'createGroup'
            });
        })
    }
}
