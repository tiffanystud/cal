<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class UsersAvailabilitiesService {
    public static function getByParams($input) {
        $db = new DBAccess("users_availabilities");
        $all = $db->getAll();

        $exists = array_find($all, fn($x) => $x["userId"] === $input["userId"] && $x["date"] === $input["date"]);
        if (!$exists) throw new Exception("Availability not found");

        return $exists;
    }

    /* --- POST ---- */
    public static function post($input) {
        $db = new DBAccess("users_availabilities");
        $all = $db->getAll();
        $users = new DBAccess("users");
        $cals = new DBAccess("calendars");
        if (!isset($input["userId"], $input["date"], $input["isAvailable"], $input["calId"])) throw new Exception("Missing attributes");
        if (!$users->findById($input["userId"]) || !$cals->findById($input["calId"])) throw new Exception("User or calendar not found");

        if (array_find($all, fn($x) => $x["userId"] === $input["userId"] && 
            $x["date"] === $input["date"] && $x["calId"] === $input["calId"])) {
            throw new Exception("Availability already exists");
        }

        $new = [
            "userId" => $input["userId"],
            "date" => $input["date"],
            "isAvailable" => $input["isAvailable"],
            "calId" => $input["calId"]
        ];
        return $db->postData($new);
    }

    /* --- PATCH ---- */
    public static function patch($input) {
        $db = new DBAccess("users_availabilities");
        $all = $db->getAll();
        
        if (!isset($input["userId"], $input["date"], $input["isAvailable"], $input["calId"])) throw new Exception("Missing attributes");
        $exists = array_find($all, fn($x) => $x["userId"] === $input["userId"] && 
            $x["date"] === $input["date"] && $x["calId"] === $input["calId"]);
        if (!$exists) throw new Exception("Availability not found");

        if ($exists["date"] === $input["date"] && $exists["isAvailable"] === $input["isAvailable"]) throw new Exception("No changes made");
        $data = [
            "date" => $input["date"],
            "isAvailable" => $input["isAvailable"]
        ];
        return $db->patchData($exists["id"], $data);
    }


    /* --- DELETE ---- */
    public static function delete($input) {
        $db = new DBAccess("users_availabilities");
        $all = $db->getAll();
        
        if (!isset($input["userId"], $input["date"], $input["calId"])) throw new Exception("Missing attributes");
        $exists = array_find($all, fn($x) => $x["userId"] === $input["userId"] && 
        $x["date"] === $input["date"] && $x["calId"] === $input["calId"]);
        if (!$exists) throw new Exception("Availability not found");

        return $db->deleteData($exists["id"]);
    }

}