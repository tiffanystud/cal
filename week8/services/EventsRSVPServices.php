<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class EventsRSVPService {
    /* ---- GET ---- */
    public static function getAll($input){
        
        $eventId = $input["eventId"] ?? null;
        $userId = $input["userId"] ?? null;
        
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
        
        return json_decode(json_encode($filtered), true);
 
    }

    /* --- POST ---- */
    public static function create($input){
        
        $eventId = $input["eventId"] ?? null;
        $userId = $input["userId"] ?? null;
        $isGoing = $input["isGoing"] ?? null;
        $reminder = $input["reminder"] ?? null;

        if (!isset($eventId, $userId, $isGoing, $reminder )) {
            throw new Exception("Missing attributes");
        }
            
        $db =  new DBAccess("events_rsvp");
        $items = $db->getAll();
        
        // Does RSVP exist
        foreach ($items as $currItem) {
            if ($currItem["userId"] == $userId && 
                $currItem["eventId"] == $eventId) {
                throw new Exception("RSVP already exists");
            }
        }
    
        
        // Create new RSVP
        $date = date("Y-m-d");
        $newRSVP = [
            "id" => uniqid(),
            "eventId" => $eventId,
            "userId" => $userId,
            "date" =>  $date,
            "isGoing" => $isGoing,
            "reminder" => $reminder
        ];
        
        $result = $db->postData($newRSVP);
        return $result;        
            
    }



    /* --- PATCH ---- */
    public static function update($input)
    {
            
        $eventId = $input["eventId"] ?? null;
        $userId = $input["userId"] ?? null;
        $isGoing = $input["isGoing"] ?? null;
        $reminder = $input["reminder"] ?? null;
        
        if (!isset($eventId, $userId, $isGoing, $reminder)) {
            throw new Exception("Missing attributes");
        }
        
        $db = new DBAccess("events_rsvp");
        $items = $db->getAll();
        
        foreach ($items as $currAvailability) {
            if (
                $currAvailability["userId"] == $userId &&
                $currAvailability["eventId"] == $eventId
                ) {
                    // Chech if RSVP already is the same (change possible for isGoing/reminder)
                    if ($currAvailability["isGoing"] == $input["isGoing"] &&
                        $currAvailability["reminder"] == $input["reminder"]
                    ) {
                        throw new Exception("No changes made");
                    }
                    
                    // Uppdara date som "latest change" eller när RSVP är skapad?
                    $date = date("Y-m-d");
                    
                    if ($currAvailability["isGoing"] !== $input["isGoing"]) {
                        $changes = ["isGoing" => $input["isGoing"], "date" => $date];
                    } else {
                        $changes = ["reminder" => $input["reminder"], "date" => $date];   
                    }
                    
                    // Updated item
                    return $db->patchData($currAvailability["id"],$changes);
            }
                
        }
                
        throw new Exception("RSVP not found");
        
    }


    /* --- DELETE ---- */
    public static function delete($input)
    {

        $eventId = $input["eventId"] ?? null;
        $userId = $input["userId"] ?? null;
        
        if (!isset($eventId, $userId)) {
            throw new Exception("Missing attributes");
        }
        
        $db = new DBAccess("events_rsvp");
        $items = $db->getAll();
        
        foreach($items as $currAvailability) {
            if (
                $currAvailability["eventId"] == $eventId &&
                $currAvailability["userId"] == $userId
                ) {
                    // Returns deleted item
                    return $db->deleteData($currAvailability["id"]);
                }
        }
    
        throw new Exception("RSVP not found");
        
    }

}