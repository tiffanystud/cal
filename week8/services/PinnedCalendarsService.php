<?php

require_once __DIR__ . "/../repository/DBAccess.php";

class PinnedCalendarsService{

    public static function pinnedCalendarsGetAll(){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();
        
        if(empty($pinnedCalendarTable)){
            throw new Exception("No calendars found");
        } else {
            return $pinnedCalendarTable;
        }

    }

    public static function pinnedCalendarsGetById($input){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();
        $filterdPinnedCalendars = array_values(array_filter($pinnedCalendarTable, fn($pinCal) => $pinCal["userId"] == $input["userId"]));

        if(empty($filterdPinnedCalendars)){
            throw new Exception("No calendars found by userId");
        } else {
            return $filterdPinnedCalendars;
        }
    }

    public static function pinnedCalendarsPost($input){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();

        foreach($pinnedCalendarTable as $table){
            if($table["calId"] == $input["calId"]){
                throw new Exception("Calendar already exists");
            }
        }

        $newData = [
            "id" => uniqid(),
            "userId" => $input["userId"],
            "calId" => $input["calId"],
        ];
        return $db->postData($newData);

    }

    public static function pinnedCalendarsPatch($input){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();

        $changeData = [];
        foreach($input as $key => $data){
            if($key != "id"){
                $changeData[$key] = $data;
            }
        }
        if(!count($changeData) > 1){
            throw new Exception("No values to be changed");
        } else {
            return $db->patchData($input["id"], $changeData);
        }
    }

    public static function pinnedCalendarsDelete($input){
        $db = new DBAccess("pinned_calendars");
        $pinnedCalendarTable = $db->getAll();

        $checkCal = false;
        foreach($pinnedCalendarTable as $pinCal){
            if($pinCal["id"] != $input["id"]){
                $checkCal = true;
                break;
            }
        }
        
        if($checkCal){
            return $db->deleteData($input["id"]);
        } else {
            throw new Exception("Pinned calendar doesent exist");
        }
        

    }
    

}




?>