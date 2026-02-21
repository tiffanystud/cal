<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class UsersAvailabilitiesService
{
    /* ---- GET ---- */
    public static function getAll($userId = null, $date = null)
    {
        
        $db = new DBAccess("users_availabilities");
        $items = $db->getAll();
        
        if (!isset($userId, $date)) {
            // Kolla format på date?
            throw new Exception("Missing attributes");
        }
                   
        $filtered = [];

        foreach ($items as $currItem) {
            if ($currItem["userId"] == $userId && $currItem["date"] == $date ) {
                $filtered[] = $currItem;
            }
        }

        if (!$filtered) {
            throw new Exception("Availability not found");
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
                

            $dbUsersAvails = new DBAccess("users_availabilities");  
            $itemsUsersAvails = $dbUsersAvails;
            
            
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

        $db = new DBAccess("users_availabilities");
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

        $db = new DBAccess("users_availabilities");
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