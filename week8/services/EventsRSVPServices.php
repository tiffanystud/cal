<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class EventsRSVPService {
    /* ---- GET ---- */
    public static function getAll($userId = null, $eventId = null){
        
        if (!isset($userId, $eventId)) {
            throw new Exception("Missing attributes");
        }
        
        $db = new DBAccess("events_rsvp");
        $items = $db->getAll();
                   
        $filtered = [];

        // Säkerställer vi bara en rad med samma userID och eventId?
        foreach ($items as $currItem) {
            if ($currItem["userId"] == $userId && 
                $currItem["eventId"] == $eventId 
                ) {
                $filtered[] = $currItem;
            }
        }

        if (!$filtered) {
            throw new Exception("Event RSVP not found");
        }
        
        return $filtered;
 
    }

    /* --- POST ---- */
    public static function create($userId, $date, $isAvailable, $calId){
    
        //validera format?
        if (isset($userId, $date, $isAvailable, $calId)) {
            
            $dbUsers =  new DBAccess("users");
            $userItems = $dbUsers->getAll();
            
            $dbCalendars =  new DBAccess("calendars");
            $calendarItems = $dbCalendars->getAll();
            
            $userAndCalOK = false;
            
            // Does user & cal exist?
            foreach ($userItems as $currUser) {
                
                if ($currUser["id"] == $userId) {
                    foreach ($calendarItems as $currCal) {
                        
                        if ($currCal["id"] == $calId) 
                            $userAndCalOK = true;
                    }
                }
            }
            
            if (!$userAndCalOK) {
                throw new Exception("User or calendar not found");
            }
                

            $dbUsersAvails = new DBAccess("events_rsvp");  
            $itemsUsersAvails = $dbUsersAvails->getAll();
            
            
            // Check if exists
            foreach ($itemsUsersAvails as $currAvail) {
                if (
                    $currAvail["userId"] == $userId &&
                    $currAvail["date"] == $date &&
                    $currAvail["calId"] == $calId 
                ) {
                    throw new Exception("Availability already exists");
                }
            } 
            
            // Create new availability
            $newAvailability = [
                "id" => uniqid(),
                "userId" => $userId,
                "date" => $date,
                "isAvailable" => $isAvailable,
                "calId" => $calId
            ];
            
            $result = $dbUsersAvails->postData($newAvailability);
            return $result;        
                
        }

        throw new Exception( "Missing Attributes");

    }

    /* --- PATCH ---- */
    public static function update($input)
    {

        $db = new DBAccess("events_rsvp");
        $items = $db->getAll();
        
        foreach ($items as $currAvailability) {
            if (
                $currAvailability["userId"] == $input["userId"] &&
                $currAvailability["date"] == $input["date"] &&
                $currAvailability["calId"] == $input["calId"] 
                ) {
                    // Chech if availability already is the same
                    if ( $currAvailability["isAvailable"] == $input["isAvailable"] ) {
                        throw new Exception("No changes made");
                    }
                    
                    // Updated item
                    return $db->patchData($currAvailability["id"], ["isAvailable" => $input["isAvailable"]]);
            }
                
        }
                
        throw new Exception("Availability not found");
        
    }


    /* --- DELETE ---- */
    public static function delete($userId, $date, $calId)
    {

        $db = new DBAccess("events_rsvp");
        $items = $db->getAll();
        
        foreach($items as $currAvailability) {
            if (
                $currAvailability["userId"] == $userId &&
                $currAvailability["date"] == $date &&
                $currAvailability["calId"] == $calId 
                ) {
                    // Returns deleted item
                    return $db->deleteData($currAvailability["id"]);
                }
        }
    
        throw new Exception("Availability not found");
        
    }

}