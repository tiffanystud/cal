<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class PinnedCalendarsService {

    public static function getAll() {
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();
        
        if(empty($pinnedCalendarTable)){
            throw new Exception("No calendars found");
        } else {
            return $pinnedCalendarTable;
        }

    }

    public static function getByParams($input) {
        $db = new DBAccess("pinned_calendars");
        $all = $db->getAll();
        
        $connections = array_values(array_filter($all, fn($x) => $x["userId"] === $input["userId"]));
        if (count($connections) === 0) throw new Exception("Not found");

        return $connections;
    }

    public static function post($input){
        $db = new DBAccess("pinned_calendars");
        $all = $db->getAll();

        if (!isset($input["userId"], $input["calId"])) throw new Exception("Missing attributes");

        $exists = array_find($all, fn($x) => $x["userId"] === $input["userId"] && $x["calId"] === $input["calId"]);
        if ($exists) throw new Exception("Calendar already pinned");

        $newData = [
            "id" => uniqid(),
            "userId" => $input["userId"],
            "calId" => $input["calId"],
        ];
        return $db->postData($newData);

    }

    public static function delete($input){
        $db = new DBAccess("pinned_calendars");
        $all = $db->getAll();

        if (!isset($input["userId"], $input["calId"])) throw new Exception("Missing attributes");
        
        $exists = array_find($all, fn($x) => $x["userId"] === $input["userId"] && $x["calId"] === $input["calId"]);
        if ($exists) throw new Exception("Not found");
        
        return $db->deleteData($exists["id"]);
    }
}




?>