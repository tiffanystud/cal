import { apiRequest } from "../../../services/api.js";
import { PubSub } from "../../../store/pubsub.js";
import { store } from "../../../store/store.js";
import { EVENTS } from "../../../store/events.js";


export function userGroupsService() {

    // Just for rollback functionality
    const newCalendar = []

    // POST /user_calendars
    PubSub.subscribe(EVENTS.REQUEST.SENT.USERGROUPS.POST, async function (payload) {

        try {


            const response = await apiRequest({
                entity: "users_calendars",
                method: "POST",
                body: payload
            });


            PubSub.publish(EVENTS.RESPONSE.RECEIVED.USERGROUPS.POST, response);

            // Uppdatera store om OK
            newCalendar.push({
                /*             payload.calId, 
                            payload.userId */
            })

            const curr = store.getState().userData.usergroups || [];
            const updatedUG = [...curr, response];

            store.setState({
                userData: {
                    ...store.getState().userData,
                    usergroups: updatedUG
                }
            });

        } catch (err) {

            console.error("USERGROUPS POST ERROR:", err);
            PubSub.publish(EVENTS.REQUEST.ERROR.USERGROUPS.POST, err);

        }
    });
}

userGroupsService();



/* 



/ Requires: userId, calId, adminId
    public static function addUserToCalendar($input){
        
        if (!isset($input["userId"])) {
            throw new Exception("User ID missing.", 400);
        }
        if (!isset($input["calId"])) {
            throw new Exception("Calendar ID missing.", 400);
        }

        $userId  = $input["userId"];
        $calId = $input["calId"];
        $isAdmin = $input["isAdmin"] ?? false;

        $dbUsers  = new DBAccess("users");
        $dbCals = new DBAccess("calendars");
        $dbUG     = new DBAccess("users_calendars");

        // Finns user?
        if (!$dbUsers->findById($userId)) {
            throw new Exception("User not found.", 404);
        }

        // Finns cal?
        if (!$dbCals->findById($calId)) {
            throw new Exception("Calendar not found.", 404);
        }

        // finns reda u_g?
        $existing = $dbUG->getAll();
        foreach ($existing as $rel) {
            
            if ($rel["userId"] == $userId && $rel["calId"] == $calId) {
                throw new Exception("Relation already exists.", 409);
            }
        }
*/