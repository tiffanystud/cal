<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class UsersCalendarsService {
    public static function getAll(){
        $db = new DBAccess("users_calendars");
        $relations = $db->getAll();

        if (empty($relations)) {
            throw new Exception("No relations found.");
        }

        return $relations;
    }

    public static function getRelationById($id){
        $db = new DBAccess("users_calendars");
        $relation = $db->findById($id);

        if (!$relation) {
            throw new Exception("Relation not found.");
        }

        return $relation;
    }

    public static function getAllRelationsByCalId($calId){
        // Validate calendar exists
        $dbCals = new DBAccess("calendars");
        if (!$dbCals->findById($calId)) {
            throw new Exception("Calendar not found.", 404);
        }

        $db = new DBAccess("users_calendars");
        $relations = $db->getAll();

        return array_values(
            array_filter($relations, fn($x) => $x["calId"] == $calId)
        );
    }

    public static function getAllRelationsByUser($userId){
        // Validate user exists
        $dbUsers = new DBAccess("users");
        if (!$dbUsers->findById($userId)) {
            throw new Exception("User not found.");
        }

        $db = new DBAccess("users_calendars");
        $relations = $db->getAll();

        return array_values(
            array_filter($relations, fn($x) => $x["userId"] == $userId)
        );
    }

    public static function getAllEventsByCalId($calId){
        // Validate user exists
        $dbCals = new DBAccess("calendars");
        if (!$dbUsers->findById($calId)) {
            throw new Exception("Calendar not found.");
        }

        $db = new DBAccess("events");
        $events = $db->getAll();

        return array_values(
            array_filter($events, fn($x) => $x["calId"] == $calId)
        );
    }
    


 
    // Requires: userId, calId, adminId
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

        $newRelation = [
            "id"      => uniqid(),
            "userId"  => $userId,
            "calId" => $calId,
            "isAdmin" => $isAdmin
        ];

        return $dbUG->postData($newRelation);
    }





    //  Requirs: id (relation id), adminId
    public static function removeUserFromCal($input) {
        
        if (!isset($input["userId"])) throw new Exception("User ID missing.");
        if (!isset($input["calId"])) throw new Exception("Calendar ID missing.");

        $userId = $input["userId"];
        $calId    = $input["calId"];

        $dbUG = new DBAccess("users_calendars");
        $dbU = new DBAccess("users");
        $dbC = new DBAccess("calendars");

        if(!$dbU->findById($userId)){
            throw new Exception("User not found", 404);
        }
        if(!$dbC->findById($calId)){
            throw new Exception("Calendar not found", 404);
        }

        $relations = $dbUG->getAll();
        $relId = null;
        foreach ($relations as $rel){
            if ($rel["userId"] == $userId && $rel["calId"] == $calId){
                $relId = $rel["id"];
            }
        }
        if (!$relId) {
            throw new Exception("Relation not found.", 404);
        }


        /*
        $relations = self::getAllRelationsByCalId($calId);
        
        // is admin is admin?
        $adminIsAdmin = false;
        foreach ($relations as $rel) {
            if ($rel["userId"] == $adminId && $rel["isAdmin"] === true) {
                $adminIsAdmin = true;
                break;
            }
        }
        if (!$adminIsAdmin) {
            throw new Exception("Only admin can remove users from calendar.");
        }
        */
        $success = $dbUG->deleteData($relId);
        if ($success){
            return ["message" => "Deleted successfully!"];
        }
    }



    //  Requires: id (relation id), adminId? Denna inte klar.
    public static function makeUserCalAdmin($input)
    {
        if (!isset($input["userId"])) throw new Exception("User ID missing.");
        if (!isset($input["calId"])) throw new Exception("Calendar ID missing.");

        $userId = $input["userId"];
        $calId    = $input["calId"];

        $dbUG = new DBAccess("users_calendars");
        $dbU = new DBAccess("users");

        $userExists = $dbU->findById($userId);
        if (!$userExists){
            throw new Exception("User not found.", 404);
        }


        $relations = self::getAllRelationsByCalId($calId);

        foreach ($relations as $rel) {
            if ($rel["userId"] == $userId) {
                $dbUG->patchData($rel["id"], ["isAdmin" => true]);
                return ["message" => "Admin status changed!"];
            }
        }

        throw new Exception("User not in calendar.");

        // is admin admin?
        /*
        $adminIsAdmin = false;
        foreach ($relations as $rel) {
            if ($rel["userID"] == $adminId && $rel["isAdmin"] === true) {
                $adminIsAdmin = true;
                break;
            }
        }
        
        if (!$adminIsAdmin) {
            throw new Exception("Only admin can change admin status.");
        }
        // Only allowed change: isAdmin = true
        */
    }
}

