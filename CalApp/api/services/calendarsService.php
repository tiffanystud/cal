<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class CalendarsService {

    public static function getAll() {
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();

        if(count($calendarTable) === 0) {
            throw new Exception("No calendars found");
        } else {
            return $calendarTable;
        }
    }

    public static function getById($input){
        $db = new DBAccess("calendars");
        $calendarById = $db->findById($input["id"]);

        if(!$calendarById){
            throw new Exception("Not found");
        } else {
            return $calendarById;
        }
    }

    public static function post($input){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();

        $type = $input["type"] ?? null;
        $name = $input["name"] ?? null;
        $creatorId = $input["creatorId"] ?? null;
        $desc = $input["description"] ?? null;

        if (!$type || !$name || $creatorId) {
            throw new Exception("Missing attributes");
        }

        if ($input["type"] != "public" && $input["type"] != "private") {
            throw new Exception("Invalid group type");  
        }

        $newData = [
            "id" => uniqid(),
            "creatorId" => $input["creatorId"],
            "name" => $input["name"],
            "description" => $input["description"],
            "type" => $input["type"]
        ];
        return $db->postData($newData);
        
    }

    public static function patch($input){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();
        
        $name = $input["name"] ?? null;
        $desc = $input["description"] ?? null;

        if (!$name && !$desc) {
            throw new Exception("Missing attributes");
        }

        $changeData = [];
        if ($name && $desc) {
            $changeData["name"] = $name;
            $changeData["description"] = $desc;
        } else if ($name) {
            $changeData["name"] = $name;
        } else {
            $changeData["description"] = $desc;
        }

        return $db->patchData($input["id"], $changeData);

    }

    public static function delete($input){
        $db = new DBAccess("calendars");
        $calendarTable = $db->getAll();

        $calId = $input["calId"] ?? null;

        if (!$calId) throw new Exception("Missing attributes");

        $cal = $db->findById($calId);

        if (!$cal) {
            throw new Exception("Not found");
        } else {
            $db->deleteData($calId);
        }
    }
}
?>