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
            throw new Exception("RSVP not found");
        }
        
        return $filtered;
 
    }

    /* --- POST ---- */
    public static function create($input){
        
        $eventId = $input["eventId"] ?? null;
        $userId = $input["userId"] ?? null;
        $date = $date["date"] ?? null;
        $reminder = $input["reminder"] ?? null;

        if (!isset($eventId, $userId, $date, $reminder)) {
            return new ErrorException("Missing attributes");
        }
            
        $db =  new DBAccess("events_rsvp");
        $items = $db->getAll();
        
        // Does RSVP exist
        foreach ($items as $currItem) {
            if ($currItem["userId"] == $userId && $currItem["eventId"] == $eventId) {
                throw new Exception("RSVP already exists");
            }
        }
    
        // Create new availability
        $newRSVP = [
            "id" => uniqid(),
            "eventId" => $eventId,
            "userId" => $userId,
            "date" => $date,
            "reminder" => $reminder
        ];
        
        $result = $items->postData($newRSVP);
        return $result;        
            
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