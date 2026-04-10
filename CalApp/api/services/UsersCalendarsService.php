<?php

require_once __DIR__ . "/../repository/DBAccess.php";
require_once __DIR__ . "/userService.php";
require_once __DIR__ . "/calendarsService.php";

class UsersCalendarsService {
    public static function getAll(){
        $db = new DBAccess("users_calendars");
        $all = $db->getAll();

        if (count($all) === 0) throw new Exception("No connections found");

        return $all;
    }

    public static function getByParams($input){
        $id = $input["id"] ?? null;
        $userId = $input["userId"] ?? null;
        $calId = $input["calId"] ?? null;
        $db = new DBAccess("users_calendars");
        $all = $db->getAll();

        if ($id) {
            $exists = $db->findById($id);
            if (!$exists) throw new Exception("Relation not found");
        } 

        if ($userId) {
            $userExists = UserService::getById($userId);
            if (isset($userExists["error"])) throw new Exception("User not found");

            return array_values(array_filter($all, fn($x) => $x["userId"] === $userId));
        } 

        if ($calId) {
            try {
                CalendarsService::getByParams(["id" => $calId]);
                return array_values(array_filter($all, fn($x) => $x["calId"] === $calId));
            } catch (Exception $e) {
                throw new Exception("Calendar not found");
            }
        }

        throw new Exception("Missing attributes");
    }
 
    // Requires: userId, calId, adminId
    public static function post($input){
        
        if (!isset($input["userId"], $input["calId"])) {
            throw new Exception("Missing attributes");
        }

        $userId  = $input["userId"];
        $calId = $input["calId"];
        $isAdmin = $input["isAdmin"] ?? false;

        $dbUsers = new DBAccess("users");
        $dbCals = new DBAccess("calendars");
        $dbUG = new DBAccess("users_calendars");

        // Finns user?
        if (!$dbUsers->findById($userId)) {
            throw new Exception("User not found");
        }

        // Finns cal?
        if (!$dbCals->findById($calId)) {
            throw new Exception("Calendar not found");
        }

        // finns reda u_g?
        $existing = $dbUG->getAll();
        foreach ($existing as $rel) {
            
            if ($rel["userId"] == $userId && $rel["calId"] == $calId) {
                throw new Exception("User is already in cal");
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
    public static function delete($input) {
        
        if (!isset($input["userId"], $input["calId"])) throw new Exception("Missing attributes");

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

